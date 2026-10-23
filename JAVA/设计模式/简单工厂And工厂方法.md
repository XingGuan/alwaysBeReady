### 工厂模式  
> 工厂模式，他主要考察你对"创建对象"这件事的解耦能力。  

#### 为什么需要工厂模式？  
假设你要写一个图表库，支持柱状图、饼图、折线图。不用工厂模式时，客户端代码可能是这样：  
```java
    Chart chart;
    String type = "bar";
    if("bar".equals(type)){
        chart = new BarChart();
    }else if("pie".equals(type)){
        chart = new PieChart();
    }else if("line".equals(type)){
        chart = new LineChart();
    }
    chart.display();
``` 
问题很明显：  
1.**客户端必须知道所有具体类，**耦合严重。  
2.**新增一种图表，客户端代码要改，**违反开闭原则。  
3.创建逻辑分散在各处，难以统一管理。  

工厂模式的核心思想就是：把"创建对象"这件事从客户端代码中抽离出来，交给一个专门的工厂负责。客户端只说"我要什么"，不关心"怎么创建"。  

二、简单工厂模式（`Simple Factory`）  
1.核心思想  
简单工厂又叫**静态工厂方法模式**。它定义一个工厂类，根据传入的参数，**在一个方法内部用`if else`或`switch`决定创建哪种具体产品**，并返回产品的抽象类型。  
