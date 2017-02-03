# react-native-ikon
Simple, generic and flexible json-based icon-management.

This library is NOT to be confused with specific Icon-support-libraries like
[react-native-vector-icons](https://github.com/oblador/react-native-vector-icons).

The purpose is to support individual icons and to apply their style and size only once
or once per Icon-group.

Insead of
```
<Image source={....} width={32} height={32} style={....}/>
```
one can use the Ikon-component and apply the styles, width and height in an
json based object structure:
```
<Ikon name="themes.default.lessons"/>
```

The render-function of `<Ikon>` will look up an IconSet-structure to pick relevant values
like 'width' and 'height' by the name that was passed to the Ikon-component.
If these attributes are not present, it will traverse up the IconSet-structure
unless the attribute could be found. This way, nested groups are supported and
will read inherited values from their parent.

## ChangeLog

0.1.2 -> Property "onPress" (optional) added to provide button-functionality

0.1.1 -> fix for redux (if used)

## Example of an iconSet:
```javascript
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
        // specific icon
        openLesson: {
          source: require('./img/icon-open.png'),
        },
        // specific icon
        closeLesson: {
          source: require('./src/img/icon-open.png'),
          transform:[{rotate: '180 deg'}],
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

## How to use:
Somewhere in the code (e.g. the root component), just register the IconSet:
```javascript
import {iconSet} from './iconSet';
import Ikon from 'react-native-ikon';

Ikon.registerIconSet(iconSet);
```

In the render-functions:
```javascript
<Ikon name="lessons.openLesson" />
```

## Special mode: "disabled" icons

It is also possible to specify an icon as "disabled":
```javascript
<Ikon name="lessons.openLesson" disabled={true} />
```

If disabled, it will look up a specific node in the iconSet with the name "$.disabled"
and apply all their attributes to the `<Image>`-component.
If $disabled was not found, it will default to an opacity of 0.5.

## AutoScaling

If the attribute *autoScale* is true, the width and height will be automatically adjusted to the
screensize in the same way like Facebook [did it in f8app](https://github.com/fbsamples/f8app/blob/master/js/common/F8Text.js#L46).


## Properties

The following props are supported being passed into the < Icon >-Tag, where they do
override any settings in the IconSet-Structure.

- width
- height
- [resizeMode](https://facebook.github.io/react-native/docs/image.html#resizemode)
- autoScale
- [style](https://facebook.github.io/react-native/docs/image.html#source)
- [source](https://facebook.github.io/react-native/docs/image.html#source)
- onPress (when present, the icon is encapsulated within a TouchableOpacity passing this onPress-handler)
