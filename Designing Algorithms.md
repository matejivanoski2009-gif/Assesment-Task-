# Designing Algorithms:

## Structure Chart:
From the structure chart, the organisation of the entire program is illustrated by breaking it down into smaller subprograms. It starts with the main program, then highlights the different functions, such as starting the game, checking answers, loading levels, and more. Each part carries out certain responsibilities, making it easy for the programmer to manage the entire system.

<img width="831" height="822" alt="Screenshot 2026-04-18 at 4 13 09 pm" src="https://github.com/user-attachments/assets/9a552ad5-dcd3-4f6e-8652-4677fc27bb46" />



## Flowchart:
The flowchart describes the sequence of operations executed by the program. Starting from the moment the user launches the game and moving through stages such as presenting the homepage, launching the game, and others. These decision blocks represent places in the algorithm where certain conditions need to be met. For example, does the user enter the right answer? Are there any other levels that need to be completed? It also shows the loop where the game repeats for each level

<img width="688" height="696" alt="Screenshot 2026-04-18 at 4 57 49 pm" src="https://github.com/user-attachments/assets/d915b66f-28ec-40b1-ae2e-4c00dcfbd61e" />
Structure chart and flowchart created using Lucidchart, available at lucidchart.com.


# Pseudocode:

## Sequence

```
displayHomePage()
WAIT for user to click start
score ← 0
level ← 1
```

## Selection

```
IF userAnswer = correctAnswer THEN
    display "Correct"
    score ← score + 1
ELSE
    display "Incorrect"
ENDIF
```

## Iteration

```
WHILE level ≤ totalLevels

    loadLevel(level)
    displayChallenge(level)

    userAnswer ← getUserInput()

    IF userAnswer = correctAnswer THEN
        display "Correct"
        score ← score + 1
    ELSE
        display "Incorrect"
    ENDIF

    level ← level + 1

ENDWHILE
```

## Final Output

```
display "Game Over"
display "Final Score: " + score
```
