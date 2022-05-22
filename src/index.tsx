import React from 'react';
import {
    View,
    Text,
    Switch,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    ActivityIndicator,
    Keyboard,
    StyleProp,
    ViewStyle,
    TextStyle,
    EmitterSubscription
} from 'react-native';
import {createNativeStackNavigator, NativeStackScreenProps} from '@react-navigation/native-stack';

/**
 * A configuration getter, may be synchronous or asynchronous.
 *
 * Asynchronous getters will trigger a spinning activity indicator.
 */
export type ReactNativeSettingsGetter<T> = () => T | Promise<T>;

/**
 * A configuration setter, may be synchronous or asynchronous.
 *
 * May synchronously return false to deny the operation.
 */
export type ReactNativeSettingsSetter<T> = (v: T) => boolean | void | Promise<void>;

export interface SettingsElementString {
    label: string;
    type: 'string';
    get: ReactNativeSettingsGetter<string>;
    set: ReactNativeSettingsSetter<string>;
    display?: (v: string) => string;
    jsxLabel?: JSX.Element;
}

export interface SettingsElementNumber {
    label: string;
    type: 'number';
    get: ReactNativeSettingsGetter<number>;
    set: ReactNativeSettingsSetter<number>;
    display?: (v: number) => string;
    jsxLabel?: JSX.Element;
}

export interface SettingsElementEnum {
    label: string;
    type: 'enum';
    values: string[];
    get: ReactNativeSettingsGetter<string>;
    set: ReactNativeSettingsSetter<string>;
    display?: (v: string) => string;
    jsxLabel?: JSX.Element;
}

export interface SettingsElementBoolean {
    label: string;
    type: 'boolean';
    get: ReactNativeSettingsGetter<boolean>;
    set: ReactNativeSettingsSetter<boolean>;
    jsxLabel?: JSX.Element;
}

export type SettingsElementSection = {
    label: string;
    type: 'section';
    elements: SettingsElement[];
    jsxLabel?: JSX.Element;
};

export type SettingsElement =
    | SettingsElementString
    | SettingsElementNumber
    | SettingsElementEnum
    | SettingsElementBoolean
    | SettingsElementSection;

export interface SettingsStyle {
    screen?: StyleProp<ViewStyle>;
    list?: StyleProp<ViewStyle>;
    header?: StyleProp<ViewStyle>;
    item?: StyleProp<ViewStyle>;
    label?: StyleProp<TextStyle>;
    value?: StyleProp<TextStyle>;
    input?: StyleProp<TextStyle>;
    spinner?: StyleProp<ViewStyle>;
}

const defaultStyles: SettingsStyle = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 5
    },
    list: {
        padding: 5
    },
    header: {
        backgroundColor: '#dce3f4',
        height: 40,
        flexDirection: 'row',
        alignItems: 'center',
        paddingStart: 10,
        paddingEnd: 10
    },
    item: {
        fontFamily: 'sans-serif',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 40,
        borderColor: '#c8c7cc',
        borderBottomWidth: 2,
        paddingStart: 10,
        paddingEnd: 10
    },
    input: {
        fontFamily: 'sans-serif'
    },
    label: {},
    value: {
        color: '#c8c7cc'
    },
    spinner: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 100
    }
});

interface SettingContextType {
    spinStart: () => void;
    spinStop: () => void;
}

/* istanbul ignore next 5 */
const SettingsContext = React.createContext<SettingContextType>({
    spinStart: () => undefined,
    spinStop: () => undefined
});

function then<T>(value: T | Promise<T>, fn: (value: T) => void): void {
    if (value instanceof Promise) value.then(fn);
    else fn(value);
}

type reducerAction<T> = {
    item: SettingsElement;
    value: T;
    initOnly?: boolean;
    context: SettingContextType;
};
function reducer<T>(state: T, action: reducerAction<T>): T {
    if (action.item.type === 'section') throw new Error('Sections cannot be reduced');
    const newState = action.value;

    if (action.initOnly) return newState;

    const setResult = action.item.set(action.value as never);
    if (setResult === false) return state;
    if (setResult instanceof Promise) {
        // This is because of https://github.com/facebook/react-native/issues/33848
        // (in an ideal world spinStart would have been synchronous)
        setTimeout(() => action.context.spinStart(), 0);
        setResult.then(() => action.context.spinStop());
    }

    return newState;
}
// Alas `typeof xxx<T>` is not a supported syntax in TypeScript
type reducerType<T> = (state: T, action: reducerAction<T>) => T;

type StackParamList = {
    ReactNativeSettingsMain: undefined;
    ReactNativeSettingsEnum: {data: number};
};
const SettingsStack = createNativeStackNavigator<StackParamList>();

const EnumValuesIPC: {element: SettingsElementEnum; onChange: (val: string) => void}[] = [];

function Section(props: {
    element: SettingsElementSection;
    styles?: SettingsStyle;
    nav: NativeStackScreenProps<StackParamList, 'ReactNativeSettingsMain'>;
}) {
    const styleLabel = React.useMemo(
        () => props.styles?.label ?? defaultStyles.label,
        [props.styles?.label]
    );
    const styleHeader = React.useMemo(
        () => props.styles?.header ?? defaultStyles.header,
        [props.styles?.header]
    );

    const jsx = React.useMemo(
        () =>
            props.element.jsxLabel ?? (
                <View style={styleHeader}>
                    <Text style={styleLabel}>{props.element.label}</Text>
                </View>
            ),
        [props.element.jsxLabel, styleLabel, styleHeader, props.element.label]
    );

    return (
        <View>
            {jsx}
            <SettingsList nav={props.nav} settings={props.element.elements} styles={props.styles} />
        </View>
    );
}

function Boolean(props: {
    element: SettingsElementBoolean;
    styles?: SettingsStyle;
    nav: NativeStackScreenProps<StackParamList, 'ReactNativeSettingsMain'>;
}) {
    const context = React.useContext(SettingsContext);
    const [value, dispatch] = React.useReducer<reducerType<boolean>>(reducer, false);
    React.useEffect(() => {
        context.spinStart();
        then(props.element.get(), (v) => {
            dispatch({item: props.element, value: v, initOnly: true, context});
            context.spinStop();
        });
    }, [props.element, dispatch, context]);

    const onPress = React.useCallback(
        () => dispatch({item: props.element, value: !value, context}),
        [dispatch, props.element, value, context]
    );

    const styleItem = React.useMemo(
        () => props.styles?.item ?? defaultStyles.item,
        [props.styles?.item]
    );
    const styleLabel = React.useMemo(
        () => props.styles?.label ?? defaultStyles.label,
        [props.styles?.label]
    );

    const jsx = React.useMemo(
        () => props.element.jsxLabel ?? <Text style={styleLabel}>{props.element.label}</Text>,
        [props.element.jsxLabel, styleLabel, props.element.label]
    );

    return (
        <TouchableOpacity onPress={onPress}>
            <View style={styleItem}>
                {jsx}
                <View pointerEvents='none'>
                    <Switch value={value} />
                </View>
            </View>
        </TouchableOpacity>
    );
}

function StringNumber(props: {
    element: SettingsElementNumber | SettingsElementString;
    styles?: SettingsStyle;
    nav: NativeStackScreenProps<StackParamList, 'ReactNativeSettingsMain'>;
    editing: boolean;
    setEditing: (v: boolean) => void;
}) {
    const context = React.useContext(SettingsContext);

    const [value, dispatch] = React.useReducer<reducerType<string | number>>(reducer, '');
    React.useEffect(() => {
        context.spinStart();
        then(props.element.get(), (v) => {
            dispatch({item: props.element, value: v, initOnly: true, context});
            setInputText(v.toString());
            context.spinStop();
        });
    }, [props.element, dispatch, context]);

    const textInput = React.useRef<TextInput>(null);
    const textListener = React.useRef<EmitterSubscription | null>(null);
    React.useEffect(() => {
        if (textListener.current) textListener.current.remove();
        textListener.current = Keyboard.addListener('keyboardDidHide', () => {
            if (textInput.current) textInput.current.blur();
            if (textListener.current) textListener.current.remove();
        });
        return () => {
            if (textListener.current) textListener.current.remove();
        };
    }, [textInput]);

    const [inputText, setInputText] = React.useState<string>('');
    const onChangeText = React.useCallback((t) => setInputText(t), [setInputText]);
    const onSubmitEditing = React.useCallback(
        () =>
            dispatch({
                item: props.element,
                value: inputText,
                context
            }),
        [props, dispatch, inputText, context]
    );
    const onBlur = React.useCallback(() => {
        props.setEditing(false);
        if (textListener.current) textListener.current.remove();
    }, [props, textListener]);
    const onPress = React.useCallback(() => {
        props.setEditing(true);
    }, [props]);

    const styleItem = React.useMemo(
        () => props.styles?.item ?? defaultStyles.item,
        [props.styles?.item]
    );
    const styleValue = React.useMemo(
        () => props.styles?.value ?? defaultStyles.value,
        [props.styles?.value]
    );
    const styleLabel = React.useMemo(
        () => props.styles?.label ?? defaultStyles.label,
        [props.styles?.label]
    );
    const styleInput = React.useMemo(
        () => props.styles?.input ?? defaultStyles.input,
        [props.styles?.input]
    );
    const display = React.useMemo(
        () => (props.element.display || ((i: number | string) => i.toString()))(value as never),
        [value, props.element.display]
    );
    const jsx = React.useMemo(
        () => props.element.jsxLabel ?? <Text style={styleLabel}>{props.element.label}</Text>,
        [props.element.jsxLabel, styleLabel, props.element.label]
    );
    const kbType = React.useMemo(
        () => (props.element.type === 'number' ? 'numeric' : undefined),
        [props.element.type]
    );

    if (props.editing) {
        return (
            <View style={styleItem}>
                <TextInput
                    autoFocus
                    ref={textInput}
                    style={styleInput}
                    value={inputText}
                    blurOnSubmit={true}
                    keyboardType={kbType}
                    onChangeText={onChangeText}
                    onSubmitEditing={onSubmitEditing}
                    onBlur={onBlur}
                />
            </View>
        );
    }

    return (
        <TouchableOpacity onPress={onPress}>
            <View style={styleItem}>
                {jsx}
                <Text style={styleValue}>{display}</Text>
            </View>
        </TouchableOpacity>
    );
}

function Enum(props: {
    element: SettingsElementEnum;
    styles?: SettingsStyle;
    nav: NativeStackScreenProps<StackParamList, 'ReactNativeSettingsMain'>;
}) {
    const context = React.useContext(SettingsContext);
    const [value, dispatch] = React.useReducer<reducerType<string>>(
        reducer,
        props.element.values[0]
    );

    React.useEffect(() => {
        context.spinStart();
        then(props.element.get(), (v) => {
            dispatch({item: props.element, value: v, initOnly: true, context});
            context.spinStop();
        });
    }, [props.element, dispatch, context]);

    const onChange = React.useCallback(
        (v: string) => dispatch({item: props.element, value: v, context}),
        [props.element, context]
    );
    const onPress = React.useCallback(
        () =>
            props.nav.navigation.navigate('ReactNativeSettingsEnum', {
                data:
                    EnumValuesIPC.push({
                        element: props.element,
                        onChange
                    }) - 1
            }),
        [props.nav, props.element, onChange]
    );

    const styleItem = React.useMemo(
        () => props.styles?.item ?? defaultStyles.item,
        [props.styles?.item]
    );
    const styleValue = React.useMemo(
        () => props.styles?.value ?? defaultStyles.value,
        [props.styles?.value]
    );
    const styleLabel = React.useMemo(
        () => props.styles?.label ?? defaultStyles.label,
        [props.styles?.label]
    );
    const display = React.useMemo(
        () => (props.element.display || ((i) => i))(value),
        [value, props.element.display]
    );
    const jsx = React.useMemo(
        () => props.element.jsxLabel ?? <Text style={styleLabel}>{props.element.label}</Text>,
        [props.element.jsxLabel, styleLabel, props.element.label]
    );

    return (
        <TouchableOpacity onPress={onPress}>
            <View style={styleItem}>
                {jsx}
                <Text style={styleValue}>{display}</Text>
            </View>
        </TouchableOpacity>
    );
}

function SettingsList(props: {
    settings: SettingsElement[];
    styles?: SettingsStyle;
    name?: string;
    nav: NativeStackScreenProps<StackParamList, 'ReactNativeSettingsMain'>;
}) {
    const [editing, setEditing] = React.useState<number>(NaN);

    return (
        <View style={props.styles?.list ?? defaultStyles.list}>
            {props.settings.map((element, i) => {
                switch (element.type) {
                    case 'section':
                        return (
                            <Section
                                key={i}
                                element={element}
                                styles={props.styles}
                                nav={props.nav}
                            />
                        );
                    case 'boolean':
                        return (
                            <Boolean
                                key={i}
                                element={element}
                                styles={props.styles}
                                nav={props.nav}
                            />
                        );
                    case 'string':
                    case 'number':
                        return (
                            <StringNumber
                                key={i}
                                element={element}
                                styles={props.styles}
                                nav={props.nav}
                                editing={editing === i}
                                setEditing={(v: boolean) => (v ? setEditing(i) : setEditing(NaN))}
                            />
                        );
                    case 'enum':
                        return (
                            <Enum key={i} element={element} styles={props.styles} nav={props.nav} />
                        );
                }
            })}
        </View>
    );
}

function EnumValues(props: {
    element: SettingsElementEnum;
    onChange: (val: string) => void;
    styles?: SettingsStyle;
}) {
    const display = props.element.display || ((i) => i);
    return (
        <View>
            {props.element.values.map((val, i) => (
                <View key={i} style={props.styles?.item ?? defaultStyles.item}>
                    <TouchableOpacity onPress={() => props.onChange(val)}>
                        <Text>{display(val)}</Text>
                    </TouchableOpacity>
                </View>
            ))}
        </View>
    );
}

const activityStyle: Record<'true' | 'false', StyleProp<ViewStyle>> = {
    true: {
        flex: 1,
        opacity: 0.25
    },
    false: {
        flex: 1,
        opacity: 1
    }
};

/**
 * Configurable Settings Screen for React Native.
 *
 * Must be included inside of a <NavigationContainer> or a <_navigation_.Screen> component.
 *
 * @param props
 * @returns
 */
export default function ReactNativeSettings(props: {
    /**
     * List of settings
     */
    settings: SettingsElement[];

    /**
     * Optional styles overriding the default styles
     */
    styles?: SettingsStyle;
}) {
    const [spinning, setSpinning] = React.useState<number>(0);

    const styleScreen = React.useMemo(
        () => props.styles?.screen ?? defaultStyles.screen,
        [props.styles?.screen]
    );
    const styleSpinner = React.useMemo(
        () => props.styles?.spinner ?? defaultStyles.spinner,
        [props.styles?.spinner]
    );

    const context = React.useMemo(
        () => ({
            spinStart: () => setSpinning((current) => current + 1),
            spinStop: () => setSpinning((current) => current - 1)
        }),
        [setSpinning]
    );

    const EnumValuesMemo = React.useCallback(
        (nav) => (
            <EnumValues
                element={EnumValuesIPC[nav.route.params.data].element}
                styles={props.styles}
                onChange={(v: string) => {
                    EnumValuesIPC[nav.route.params.data].onChange(v);
                    nav.navigation.navigate('ReactNativeSettingsMain');
                    EnumValuesIPC.splice(nav.route.params.data, 1);
                }}
            />
        ),
        [props.styles]
    );

    const spinnerState = React.useRef<{timer: number; state: boolean}>({
        timer: 0,
        state: true
    });
    const [spinnerShown, setSpinnerShown] = React.useState<boolean>(true);
    React.useLayoutEffect(() => {
        // This transition has a brief grace time to avoid flickering the screen
        // on very fast asynchronous configuration operations
        if (spinning > 0 !== spinnerState.current.state) {
            if (spinnerState.current.timer) clearTimeout(spinnerState.current.timer);
            spinnerState.current.state = spinning > 0;

            // The limit of human perception is about 50ms
            spinnerState.current.timer = window.setTimeout(
                () => {
                    spinnerState.current.timer = 0;
                    setSpinnerShown(spinning > 0);
                },
                // Spinning off is immediate
                spinning > 0 ? 50 : 0
            );
        }
        return () => {
            // Cleanup when the component is unmounted
            if (spinnerState.current && spinnerState.current.timer)
                // eslint-disable-next-line react-hooks/exhaustive-deps
                clearTimeout(spinnerState.current.timer);
        };
    });

    return (
        <View style={styleScreen}>
            <View
                pointerEvents={spinning > 0 ? 'none' : 'auto'}
                style={activityStyle[spinnerShown.toString()]}
            >
                {spinnerShown ? <ActivityIndicator style={styleSpinner} size='large' /> : null}
                <SettingsContext.Provider value={context}>
                    <SettingsStack.Navigator>
                        <SettingsStack.Screen
                            name={'ReactNativeSettingsMain'}
                            options={{headerShown: false}}
                        >
                            {(nav) => (
                                <SettingsList
                                    nav={nav}
                                    settings={props.settings}
                                    styles={props.styles}
                                />
                            )}
                        </SettingsStack.Screen>
                        <SettingsStack.Screen
                            name={'ReactNativeSettingsEnum'}
                            options={({route}) => ({
                                title: EnumValuesIPC[route.params.data].element.label
                            })}
                        >
                            {EnumValuesMemo}
                        </SettingsStack.Screen>
                    </SettingsStack.Navigator>
                </SettingsContext.Provider>
            </View>
        </View>
    );
}
