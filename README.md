# react-native-settings-screen

[![License: ISC](https://img.shields.io/github/license/mmomtchev/react-native-settings-screen)](https://github.com/mmomtchev/react-native-settings-screen/blob/main/LICENSE) [![npm version](https://img.shields.io/npm/v/react-native-settings-screen)](https://www.npmjs.com/package/react-native-settings-screen) [![Node.js CI](https://github.com/mmomtchev/react-native-settings-screen/workflows/Node.js%20CI/badge.svg)](https://github.com/mmomtchev/react-native-settings-screen/actions?query=workflow%3A%22Node.js+CI%22) [![codecov](https://codecov.io/gh/mmomtchev/react-native-settings-screen/branch/main/graph/badge.svg?token=EQ2TWCZAS4)](https://codecov.io/gh/mmomtchev/react-native-settings-screen)

**React Native Universal Settings Screen With Async Support & Spinner**

To my greatest surprise, `react-native`, unlike the native frameworks of iOS and Android, does not offer a standard ready-to-use `Settings` screen template.

It seems that the `react-native` developers have decided to leave those components to the community.

# Usage

```shell
npm i --save react-native-settings-screen
```

[Check the examples](https://mmomtchev.github.io/react-native-settings-screen/)

## Quick Start

A simple Settings screens is easy to make:

```tsx
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';

import {default as ReactNativeSettings, SettingsElement} from 'react-native-settings-screen';

// We will store the config here
const configData: Record<string, string> = {};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        padding: '1.5%'
    }
});

// Retrieve a conf item or return the default
const confGet = (key: string, def: string): string => configData[key] || def;

// Store a conf item
const confSet = (key: string, value: string): void => {
    configData[key] = value;
};

// Choose from a list item
const intelligence: Record<string, string> = {L: 'Low', M: 'Medium', H: 'High'};

// This is the configuration schema
const settings: SettingsElement[] = [
    {
        label: 'Name',
        type: 'string',
        // You can override the way the value is displayed
        display: (s) => (s && s.length ? s : 'empty'),
        get: confGet.bind(null, '@name', ''),
        set: confSet.bind(null, '@name')
    },
    // Choose from a list, uses the standard phone navigation screens
    {
        label: 'Intelligence',
        type: 'enum',
        values: Object.keys(intelligence),
        display: (v: string) => intelligence[v],
        get: confGet.bind(null, '@int', 'M'),
        set: confSet.bind(null, '@int')
    },
    // Boolean switch group
    {
        label: 'Wings',
        type: 'boolean',
        get: async () => (await confGet('@wings', 'false')) === 'true',
        set: (v) => confSet('@wings', v.toString())
    }
];

export default function Settings() {
    // Simply pass the schema here
    // It integrates in your existing `NavigationContainer` or `Screen`
    return (
        <NavigationContainer>
            <View style={styles.container}>
                <ReactNativeSettings settings={settings} />
            </View>
        </NavigationContainer>
    );
}
```

![screenshot](https://raw.githubusercontent.com/mmomtchev/react-native-settings-screen/main/screenshot.png)

# API

<!-- Generated by documentation.js. Update this documentation by updating the source code. -->

### Table of Contents

-   [ReactNativeSettingsGetter](#reactnativesettingsgetter)
-   [ReactNativeSettingsSetter](#reactnativesettingssetter)
-   [ReactNativeSettings](#reactnativesettings)
    -   [Parameters](#parameters)
-   [settings](#settings)
-   [styles](#styles)

## ReactNativeSettingsGetter

A configuration getter, may be synchronous or asynchronous.

Asynchronous getters will trigger a spinning activity indicator.

Type: function (): (T | [Promise](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<T>)

## ReactNativeSettingsSetter

A configuration setter, may be synchronous or asynchronous.

May synchronously return false to deny the operation.

Type: function (v: T): ([boolean](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean) | void | [Promise](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<void>)

## ReactNativeSettings

Configurable Settings Screen for React Native.

Must be included inside of a <NavigationContainer> or a <_navigation_.Screen> component.

### Parameters

-   `props` **{settings: [Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)\<SettingsElement>, styles: SettingsStyle?}**

## settings

List of settings

Type: [Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)\<SettingsElement>

## styles

Optional styles overriding the default styles

Type: SettingsStyle

# License

ISC License

Copyright (c) 2022, Momtchil Momtchev <momtchil@momtchev.com>

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted, provided that the above
copyright notice and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.

**Includes Wings by Pedro Santos from NounProject.com**

```

```
