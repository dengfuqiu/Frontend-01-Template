# 总结

最近加班上线，没时间去找javascript的对象。。。。

## 这周学习到各个类型的底层结构  

## `var`的提升  

## `new`的一些注意事项  
* new Foo
* new a()()
* new new a()

## update
* a++
* a--
* --a
* ++a

## 编程中的`object`
* 唯一性
* 状态
* 行为（状态的改变即是行为）
* Nihilo(null 空 原型的原型)
* Nihilo(设计面向对象不应该受到语言描述的干扰 空 原型的原型)

## JavaScript
### Property Data（可以设置为只读）
* `[[Value]]`
* writable
* enumerable
* configurable
### Property Accessor（双刃剑）
* get
* set
* enumerable
* configurable
### API/Grammar
* {} / [] / Object.defineProperty
* Object.create / Object.setPrototypeOf / Object.getPrototypeOf
* new / class / extends
* new / function / prototype
### Function Object
* Object
* `[[call]]`
