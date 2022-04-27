Your translation files go here, example:

```
import en from '@/locale/base/en';
import {extend} from '@/locale/base/base';

export default extend(en, {

});
```

The extend function will override any existing translations with a custom one or inherit the original if not overridden.
