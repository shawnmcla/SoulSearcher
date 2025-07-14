# Seed Searching Options

## Legendary

The mod should allow to search for a specific legendary (at ante one)

Options:
Source: 
 - Skip tag (Charm): Round 1 skip AND/OR Round 2 Skip
 AND/OR
 - Arcana Pack: Shop 1 OR Shop 2
 
Algorithm definition:
IF Only from Skip Tag(s):
1. Check if skip tag at selected rounds, if not, go next
2. If yes, check whether the soul shows up, if not, go next
3. If yes, check whether the legendary awarded is the desired one
   If so, save seed

IF Only from shop(s):
1. Check if Arcana pack(s) show up at selected shops, if not, go next
2. If yes, check whether the soul shows up, if not, go next
3. If yes, check whether the legendary awarded is the desired one
   If so, save seed

IF From any source in ante 1:
1. Check if charm tag(s) show up, check if packs show up
2. Determine max number of arcana cards that can be seen
3. Check whether soul shows up, if not, go next
4. If yes, check whether the legendary awarded is the desired one
  If so, save seed
  