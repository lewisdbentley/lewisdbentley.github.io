---
layout: post
title: "Understanding Tableau's Grand Total Calculations"
date: 2025-01-19
categories: tableau
---

Today I learned that in Tableau Subtotals and Grand Totals are not calculated as a simple aggregation.

This became apparent after I was seeing something like this:

![Tableau Issue 1]({{ site.baseurl }}/assets/images/2025-01-19-understanding-tableau-grand-total-calculations/tableau-issue1.jpg)
*Figure 1*

Which looks reasonable at first, until you realise that those numbers should sum to 250, not 230 as we see in Figure 1.

This was for data at work, and the pokemon and their scores are just for illustration.

The scores were calculated fields doing something like this:

```tableau
ABS(SUM([QTY A]) - SUM([QTY B]))
```
A simple calculation to find the absolute difference between two quantities.

In other words, if I had 5 grapes in my right hand and 3 in my left, and I wanted to see the difference was 2 and not -2.

This is all well and good until you apply a grand total to such a measure.

As Jonathan Drumney1 notes, "Subtotals and Grand Totals are computed as a separate calculation of the Measure at a coarser level of granularity".

In other words, you may be expecting the total to be computed as an aggregate of an aggregate (like a total Sum of an Avg Sales per Department)". But it doesn't always work like that.

What was really happening becomes a bit clearer if we remove the ABS from the calculated field, leaving us with:

![Tableau Issue 2]({{ site.baseurl }}/assets/images/2025-01-19-understanding-tableau-grand-total-calculations/tableau-issue2.jpg)
*Figure 2*

As you can see, most of the values were actually negative, apart from one (in this case Charizard with a score of 10).

This allows us to see why we had a total score of 230 rather than 250 before.

The score of 10 was doing double-duty taking us in the opposite direction (positive) from the rest of the values of this sum (negative).

This is where the the Grand Total was obfuscating matters. The ABS function was not being applied at the individal pokemon level, but only at the end.

The solution to this issue was to introduce a level of detail (LOD) expression to set the level that the absolute value expression needs to be computed at2:

```tableau
SUM({ INCLUDE [Store]: ABS(SUM([QTY A]) - SUM([QTY B])) })
```

This ensures that the absolute value is taken at the pokemon level, allowing us to aggregate the values meaningfully.

The problem here was that ABS was being applied only at the end of the calculation.

I first became aware of this problem only after noticing that filtering out the offending item increased the total rather than diminishing it.

For example, if in figure 2 you removed Charizard, the total would become -240.

After the Grand Total calculation applied the ABS function right at the end, you would see the paradoxical result of removing a positive value from a total somehow increasing the total!

[1][Why your Grand Total or Subtotal isn't working as expected ↩](https://community.tableau.com/s/question/0D54T00000G552ASAR/why-your-grand-total-or-subtotal-isnt-working-as-expected)


[2][Salesforce Help Article ↩](https://help.salesforce.com/s/articleView?id=001473272&type=1)