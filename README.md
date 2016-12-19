# react-native-ikon
Simple, generic and flexible json-based icon-management.

This library is NOT to be confused with specific Icon-support-libraries like
react-native-vector-icons (https://github.com/oblador/react-native-vector-icons).

The purpose is to support individual icons and to apply their style only once.

Insead of
```
<Image source={....} width={32} height={32} style={....}/>
```
one can use the Ikon-component and apply the styles, width and height in an
json based object structure:
```
<Ikon name="themes.default.lessons"/>
```

The render-function will look up an iconSet-structure to pick relevant values
like 'width' and 'height' by the name that was passed to the Ikon-component.
If these attributes are not present, it will traverse up the IconSet-structure
unless the attribute could be found.

## Example of an iconSet:
```
export const iconSet = {
  themes:
    default:
      autoScale: true,
      width: 32,
      height: 16,
      lessons: {
        // defaults:
        resizeMode: 'stretch',
        $disabled: {
          opacity: 0.6
        },
        // specific four outbound flights
        openLesson: {
          source: require('./img/icon-open.png'),
        },
        // specific four inbound flights
        closeLesson: {
          source: require('./src/img/icon-close.png'),
        },
        help: {
          source: require('./src/img/icon-help.png'),
          height: 16 // <--- different height
        }
      }
    }
  }
}
```

## Installation

```
npm i react-native-ikon --save
```

## How to use:
Somewhere in your code (e.g. the root component), just register your Iconset:
```
import {iconSet} from './iconSet';
import Ikon from 'react-native-ikon';

Ikon.registerIconSet(iconSet);
```

In your render-functions:
```
<Ikon name="lessons.openLesson" />
```

## Special mode: "disabled" icons

It is also possible to specify an icon as "disabled":
```
<Ikon name="lessons.openLesson" disabled={true} />
```

If disabled, it will loop up a specific node in the iconSet with the name "$.disabled"
and apply all their attributes to the <Image>-component.
If $disabled was not found, it will default to an opacity of 0.5.
