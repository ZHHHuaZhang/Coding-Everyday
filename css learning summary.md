# css learning summary

## css介绍

### 框模型

CSS框模型（译者注：也被称为“盒模型”）是网页布局的基础 ——每个元素被表示为一个矩形的方框，框的内容、内边距、边界和外边距像洋葱的膜那样，一层包着一层构建起来。浏览器渲染网页布局时，它会算出每个框的内容要用什么样式，周围的洋葱层有多大，以及框相对于其它框放在哪里。

![框模型](https://mdn.mozillademos.org/files/13647/box-model-standard-small.png )

溢流
我们使用overflow属性来控制这种情况的发生
auto: 当内容过多，溢流的内容被隐藏，然后出现滚动条来让我们滚动查看所有的内容。
hidden: 当内容过多，溢流的内容被隐藏。
visible: 当内容过多，溢流的内容被显示在盒子的外边（这个是默认的行为）

```css
.autoscroll { overflow: auto;    }
.clipped    { overflow: hidden;  }
.default    { overflow: visible; }

//背景裁剪（Background clip）
.default     { background-clip: border-box;  }
.padding-box { background-clip: padding-box; }
.content-box { background-clip: content-box; }

//轮廓(Outline)
一个框的 outline 是一个看起来像是边界但又不属于框模型的东西。它的行为和边界差不多，但是并不改变框的尺寸（更准确的说，轮廓被勾画于在框边界之外，外边距区域之内）

//CSS 框类型
块框（ block box）是定义为堆放在其他框上的框（例如：其内容会独占一行），而且可以设置它的宽高，之前所有对于框模型的应用适用于块框 （ block box）
行内框（ inline box）与块框是相反的，它随着文档的文字流动（例如：它将会和周围的文字和其他行内元素出现在同一行，而且它的内容会像一段中的文字一样随着文字部分的流动而打乱），对行内盒设置宽高无效，设置padding, margin 和 border都会更新周围文字的位置，但是对于周围的的块框（ block box）不会有影响。
行内块状框（inline-block box） 像是上述两种的集合：它不会重新另起一行但会像行内框（ inline box）一样随着周围文字而流动，而且他能够设置宽高，并且像块框一样保持了其块特性的完整性，它不会在段落行中断开。（在下面的示例中，行内块状框会放在第二行文本上，因为第一行没有足够的空间，并且不会突破两行。然而，如果没有足够的空间，行内框会在多条线上断裂，而它会失去一个框的形状。）

```

## css布局

### 定位

## 弹性盒子布局flex

CSS 弹性盒子布局是 CSS 的模块之一，定义了一种针对用户界面设计而优化的 CSS 盒子模型。在弹性布局模型中，弹性容器的子元素可以在任何方向上排布，也可以“弹性伸缩”其尺寸，既可以增加尺寸以填满未使用的空间，也可以收缩尺寸以避免父元素溢出。子元素的水平对齐和垂直对齐都能很方便的进行操控。通过嵌套这些框（水平框在垂直框内，或垂直框在水平框内）可以在两个维度上构建布局。

### flex布局的基本概念

Flexible Box 模型，通常被称为 flexbox，是一种一维的布局模型。它给 flexbox 的子元素之间提供了强大的空间分布和对齐能力。本文给出了 flexbox 的主要特性，更多的细节将在别的文档中探索。

#### flexbox 的两根轴线节

主轴和交叉轴。主轴由 flex-direction 定义，另一根轴垂直于它。
主轴
row
row-reverse
column
column-reverse
如果你选择了 row 或者 row-reverse，你的主轴将沿着 inline 方向延伸。
![row](https://mdn.mozillademos.org/files/15614/Basics1.png)
选择 column 或者 column-reverse 时，你的主轴会沿着上下方向延伸 — 也就是 block 排列的方向。
![column](https://mdn.mozillademos.org/files/15615/Basics2.png)
交叉轴
交叉轴垂直于主轴，所以如果你的flex-direction (主轴) 设成了 row 或者 row-reverse 的话，交叉轴的方向就是沿着列向下的。

#### 起始线和终止线

如果 flex-direction 是 row ，并且我是在书写英文，那么主轴的起始线是左边，终止线是右边。
![Begin](https://mdn.mozillademos.org/files/15618/Basics5.png)

#### 用flex-wrap实现多行Flex容器

为了实现多行效果，请为属性flex-wrap添加一个属性值wrap。 现在，如果您的项目太大而无法全部显示在一行中，则会换行显示。 下面的实时例子包含已给出宽度的项目，对于flex容器，项目的子元素总宽度大于容器最大宽度。 由于flex-wrap的值设置为wrap，所以项目的子元素换行显示。若将其设置为nowrap，这也是初始值，它们将会缩小以适应容器，因为它们使用的是允许缩小的初始Flexbox值。 如果项目的子元素无法缩小，使用nowrap会导致溢出，或者缩小程度还不够小。
flex-wrap: wrap;

#### 简写属性 flex-flow

你可以将两个属性 flex-direction 和 flex-wrap 组合为简写属性 flex-flow。第一个指定的值为 flex-direction ，第二个指定的值为 flex-wrap.
flex-flow: row wrap;

#### flex 元素上的属性

flex-grow
flex-shrink
flex-basis
Flex 简写形式允许你把三个数值按这个顺序书写 — flex-grow，flex-shrink，flex-basis.
flex: 2 1 auto;

#### 属性简写

flex: initial 是把flex元素重置为Flexbox的初始值，它相当于 flex: 0 1 auto。在这里 flex-grow 的值为0，所以flex元素不会超过它们 flex-basis 的尺寸。flex-shrink 的值为1, 所以可以缩小flex元素来防止它们溢出。flex-basis 的值为 auto. Flex元素尺寸可以是在主维度上设置的，也可以是根据内容自动得到的。

flex: auto 等同于 flex: 1 1 auto；和上面的 flex:initial 基本相同，但是这种情况下，flex元素在需要的时候既可以拉伸也可以收缩。

flex: none 可以把flex元素设置为不可伸缩。它和设置为 flex: 0 0 auto 是一样的。元素既不能拉伸或者收缩，但是元素会按具有 flex-basis: auto 属性的flexbox进行布局。

你在教程中常看到的 flex: 1 或者 flex: 2 等等。它相当于flex: 1 1 0。元素可以在flex-basis为0的基础上伸缩。

### 元素间的对齐和空间分配

#### align-items

align-items 属性可以使元素在交叉轴方向对齐。
stretch
flex-start
flex-end
center
align-items: center;

#### justify-content

justify-content属性用来使元素在主轴方向上对齐，主轴方向是通过 flex-direction 设置的方向。初始值是flex-start，元素从容器的起始线排列。但是你也可以把值设置为flex-end，从终止线开始排列，或者center，在中间排列.
stretch
flex-start
flex-end
center
space-around
space-between
