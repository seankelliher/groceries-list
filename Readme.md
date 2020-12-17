[![MIT License on GitHub](https://img.shields.io/github/license/seankelliher/groceries-list?style=flat-square)](/LICENSE.txt)
## Groceries List

Interactive "grocery list" that totals the cost.

## Project Screen Shots

![screen shot of project](/screenshots/groceries-list-screenshot1.jpg)

![screen shot of project](/screenshots/groceries-list-screenshot2.jpg)

## Installation and Setup Instructions

This is a static component. All you need is a web browser. However, component uses ES6 modules. Developing locally may require disabling your browser's local file restrictions.

## Reflection

I wanted to build a "grocery list" component where users can add and remove items and prices to/from a list and the component automatically calculates the total cost. There were several challenges in doing this.

I needed to build a work flow that was as easy as possible for users. The cursor would automatically advance to the next field to complete whenever possible, and the total at the top of the page and inputs at the bottom of the page always remained visible, even if the list grew taller than the screen.

I also needed to ensure that users entered both a grocery name and price, and that the price was always a number. If any of these conditions were false, I needed to alert users with a unique message so they could fix the problem.

Lastly, I needed to allow users to enter prices such as "2" or "2.0" and always have them display consistently as "2.0" on the list.

Using Regular Expression, JavaScript methods such as focus() and toFixed(), and the CSS Flexible Box Layout Module, I was able to meet these goals.

## Acknowledgments

* Readme guidance from [Brenna Martenson](https://gist.github.com/martensonbj/6bf2ec2ed55f5be723415ea73c4557c4).
* JavaScript guidance from [JSLint](http://jslint.com).
* Design guidance from Google's [Material Design](https://material.io/design).
* Fonts from [Google Fonts](https://fonts.google.com).
* Shields from [Shields](https://shields.io).
