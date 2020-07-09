# yeoman-generator-helper
> Yeoman generator helper.

## installation
```shell
npm i @feizheng/yeoman-generator-helper
```

## apis
| api          | params                 | description |
| ------------ | ---------------------- | ----------- |
| discoverRoot | -                      | -           |
| shortName    | (name)                 | -           |
| extendProps  | (context)              | -           |
| underToDot   | (context)              | -           |
| rewriteProps | (props,{ exclude:[] }) | -           |
| renameBy     | (context, callback)    | -           |
| rename       | (context, src,dest)    | -           |

## gulp-rename
- https://github.com/yeoman/yo/issues/577
- https://github.com/yeoman/yeoman/issues/1676

~~~
This seems to be caused by recent changes in **gulp-rename** (current version 1.2.3). 
Older versions work just fine. 
In my case i had to pin gulp-rename to 1.2.2 to fix my generators.
~~~
