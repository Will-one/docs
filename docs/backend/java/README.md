---
title: '简介'
categoris:
- backend
tages:
- JAVA
---

## 一些基础
JDK = JRE + 开发工具集（例如javac编译工具等）
JRE = JVM + Java SE标准类库

## P37 注释
* 文档注释（java特有）
 ```java
/**
@author willone
@version 1.0.0
*/
```
* 注释内容可以被JDK提供的工具javadoc解析，生成一套以网页形式体现的该程序的说明文档。
```
javadoc -d mydoc -author -version hello.java
```
* 执行命令中文报错的可以
```
javadoc -d mydoc -encoding utf-8 -author -version hello.java
```

## P38 java程序的一些基本知识
* 编写：java代码保存在 ".java" 结尾的源文件中
* 编译：使用 javac.exe 命令编译我们的java源文件。格式：javac 源文件名.java
* 运行：使用 java.exe 命令解释运行我们的字节码文件。格式：java 类名

注意点：
* 在一个java源文件中可以声明多个class。但是，至多只有一个类声明为public
* 而且声明为public的类的类名必须与原文件名相同。

程序的入口是main()方法


## P47 java中的名称命名规范
* 包名：多单词组成时所有单词都小写：xxxyyyzzz
* 类名、接口名：多单词组成时，所有单词的首字母大写（大驼峰）：XxxYyyZzz
* 变量名、方法名：多个单词组成时（小驼峰）：xxxYyyZzz
* 常量名：所有字母大写，多单词时每个单词用下划线连接：XXX_YYY_ZZZ

## P50 数据类型
1. 基本数据类型【primitive type】
    * 数值型
        * 整数类型（byte，short，int，long）
        * 浮点类型（float，double）
    * 字符型（char）
    * 布尔型（boolean）
2. 引用数据类型【reference type】
    * 类（class）
    * 接口（interface）
    * 数组（[]）

## P51 整型变量
* byte（1字节=8bit）=》范围：-128 ~ 127
* short（2字节）
* int（4字节）
* long（8字节）
```java
// 长整型要用大写L或者小写l结尾
long lparam = 38274247L;
```

## P52 浮点型变量
* 浮点型常量有两种表示形式
    十进制数形式：5.12  512.0f  .512
    科学计数法形式：5.12e2  512E2 

* float：单精度，尾数可以精确到7位有效数字，很多情况下，精度很难满足要求。
    * 4字节：-3.403E38 ~ 3.403E38
* double：双精度，精度是float的两倍。通常采用此类型。
    * 8字节：-1.798E308 ~ 1.798E308
* Java的浮点型常量默认为double型，声明float型常量，需要在后面加'f'或者'F'
```java
float fNumber = 435.342F;
```

## P53 字符类型
* 定义char型变量，通常使用''，内部只能写一个字符
```java
char c1 = 'a';
// char c2 = 'ab'; //编译不通过，要用字符串
```

* 表示方式：1.声明一个字符 2.转义字符 3. Unicode
```java
char c5 = '\n';
char c6 = '\u0043'
```

## P55 boolean
true false

## P56-P57 自动类型提升
* 自动类型转换：容量小的类型 自动转换为 容量大的数据类型。
    * （char，byte，short）-> int -> long -> float -> double
* 有多种类型的数据混合运算时，系统首先自动将所有数据转换成容量最大的那种数据类型，然后再进行计算。
    * byte,short,char之间不会相互转换，他们三者在计算式首先转换为int类型。
    * boolean 类型不能与其他数据类型运算
    * 当把任何基本数据类型的值和字符串（String）进行连接运算时（+），基本数据类型的值将自动转换为字符串（String）类型。

## P58 强制类型转换
* 使用强转符：(类型)变量
* 注意点：强制类型转换，可能导致精度损失

```java
// 精度损失
double d1 = 12.9;
int i1 = (int)d1; // 12

// 没有精度损失
long l1 = 123；
short s1 = （short）l1; // 123

// 精度损失举例2
int i2 = 128;
byte b = (byte)i2; // -128
```

* 几个特殊情况
```java
// 整型常量，默认类型为int型
// 浮点型常量，默认类型是double

// 编码情况1
long l = 12323; // 没有在最后加L，所以编译器先将值作为int，然后变量提升
//long l = 43782734929874927847924; // 值太大，int装不下，报错

// 编码情况2
float f1 = 12.3; // 12.3默认作为double型，不能自动保存为float，报错
```

## P60-P62 String 的介绍
* String 不是基本数据类型，属于引用数据类型
* 使用方式与基本数据类型一致。例如：String str = "abcd";
* 一个字符串可以串接另一个字符串，也可以直接串接其他类型的数据

# P63-P67 进制
* 二进制：0,1 满2进1，以 0b 或者 0B 开头
* 八进制：满10进1
* 十进制：满8进1，以数字0开头
* 十六进制：满16进1，以0x或者0X开头。此处的A-F不区分大小写。 如：0x21AF + 1 = 0x21B0