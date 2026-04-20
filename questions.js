const quizData = {
  Sequence: {
    easy: [
      { q: "What is sequence in programming?", o: ["Repeating Steps", "Steps in order", "Choosing options", "Storing data"], a: "Steps in order" },
      { q: "What happens in sequence?", o: ["Random order", "Steps skipped", "Steps follow one after another", "Loop forever"], a: "Steps follow one after another" },
      { q: "Which is an example of a sequence?", o: ["IF statement", "FOR loop", "Step-by-step instructions", "Array"], a: "Step-by-step instructions" },
      { q: "What does sequence control in a program?", o: ["Decisions", "Order of steps", "Repetition", "Storage"], a: "Order of steps" },
      { q: "Sequence means:", o: ["Selection", "Order", "Repetition", "Storage"], a: "Order" },
      { q: "Sequence is important because:", o: ["It spreads code", "It organises steps correctly", "It loops code", "It stores data"], a: "It organises steps correctly" }
    ],
    medium: [
      { q: "What happens if sequence is incorrect?", o: ["Program crashes", "Output may be wrong", "Code runs faster", "Nothing changes"], a: "Output may be wrong" },
      { q: "Which comes first in a sequence?", o: ["End", "Start", "Middle", "Loop"], a: "Start" },
      { q: "A program executes instructions in:", o: ["Random order", "Written order", "Reverse order", "Alphabetical order"], a: "Written order" },
      { q: "Sequence is used in:", o: ["Only loops", "All programs", "Only arrays", "Only conditions"], a: "All programs" },
      { q: "Breaking sequence affects:", o: ["Design", "Logic", "Colour", "Layout"], a: "Logic" },
      { q: "What does an IF statement check?", o: ["A condition", "A loop", "A array", "An output"], a: "A condition" }
    ],
    hard: [
      { q: "Consider: PRINT total.  total <-- 5.  What is the issue?", o: ["Syntax error", "Logical error", "Runtime error", "Data storage"], a: "Logical error" },
      { q: "Sequence primarily controls:", o: ["Decisions", "Order of execution", "Repetition", "Storage"], a: "Order of execution" },
      { q: "Incorrect sequence can cause:", o: ["Infinite loops", "Incorrect output", "Syntax errors only", "Faster code"], a: "Incorrect output" },
      { q: "Which structure is always present in any algorithim?", o: ["Selection", "Iteration", "Sequence", "Arrays"], a: "Sequence" },
      { q: "Sequence errors are hardest to detect since:", o: ["They crash programs", "They don't stop execution", "They remove loops", "They change syntax"], a: "They don't stop execution" },
      { q: "Which scenario demonstrates incorrect sequence?", o: ["Input -> Process -> Output", "Process -> Input -> Output", "Input -> Output -> End", "Start -> Process -> End"], a: "Process -> Input -> Output" }
    ]
  },
  Selection: {
    easy: [
      { q: "What is a selection?", o: ["Looping", "Decision making", "Storing data", "Printing"], a: "Decision making" },
      { q: "Which keyword is used?", o: ["FOR", "iF", "PRINT", "ARRAY"], a: "IF" },
      { q: "What does IF statement do?", o: ["Repeats", "Checks condition", "Stores data", "Ends program"], a: "Checks condition" },
      { q: "ELSE is used when:", o: ["The condition is true", "The condition is false", "The program crashes", "The user wants to exit"], a: "The condition is false" },
      { q: "Selection chooses:", o: ["Steps", "Path", "Data", "Loop"], a: "Path" },
      { q: "A selection condition must evaluate to which of the following?", o: ["A number", "A string", "True or False (Boolean)", "A function"], a: "True or False (Boolean)" }
    ],
    medium: [
      { q: "What is evaluated in an IF statement?", o: ["Loop", "Condition", "Variable", "Output"], a: "Condition" },
      { q: "If a condition is always false, what happens?", o: ["IF runs", "Else runs (if present)", "Loop runs", "Program stops"], a: "Else runs (if present)" },
      { q: "What does '==' mean?", o: ["Assignment", "Output", "Loop", "Comparison"], a: "Comparison" },
      { q: "Which structure allows multiple decisions?", o: ["Sequence", "Loop", "Nested IF", "Array"], a: "Nested IF" },
      { q: "Selection allows a program to:", o: ["Repeat steps", "Store values", "Choose different paths", "Print output"], a: "Choose different paths" },
      { q: "Which of the following is a valid condition?", o: ["x = 5", "x == 5", "x + 5", "PRINT x"], a: "x == 5" }
    ],
    hard: [
      { q: "What will this output? IF 5 > 10 THEN PRINT 'A' ELSE PRINT 'B'", o: ["A", "B", "Both", "Error"], a: "B" },
      { q: "Which condition is true?", o: ["5 < 3", "7 == 7", "4 > 9", "2 != 2"], a: "7 == 7" },
      { q: "What is the result of the nested selection?", o: ["Multiple decision layers", "Repetition", "Faster loops", "Data storage"], a: "Multiple decision layers" },
      { q: "If no ELSE is included and the condition is false:", o: ["Error", "Loop starts", "Program ends", "Nothing happens"], a: "Nothing happens" },
      { q: "Complex selection often uses:", o: ["Loops", "AND/OR operators", "Arrays", "Output"], a: "AND/OR operators" },
      { q: "What will this output? IF 10 < 5 THEN PRINT 'Yes' ELSE PRINT 'No'", o: ["Yes", "No", "Error", "Nothing"], a: "No" }
    ]
  },
  Iteration: {
    easy: [
      { q: "What is Iteration", o: ["Repetition", "Decision", "Storage", "Input"], a: "Repetition" },
      { q: "Which is a loop?", o: ["IF", "FOR", "WHILE", "PRINT"], a: "FOR" },
      { q: "Loop repeats:", o: ["Never", "Once", "Multiple times", "Randomly"], a: "Multiple times" },
      { q: "Iteration is used to:", o: ["Store data", "End program", "Choose options", "Repeat steps"], a: "Repeat steps" },
      { q: "WHILE loop runs:", o: ["True", "False", "End", "Input"], a: "True" },
      { q: "Which loop repeats code a set number of times?", o: ["FOR", "WHILE", "DO-WHILE", "IF"], a: "FOR" }
    ],
    medium: [
      { q: "How many times does this run? FOR i = 1 TO 4, PRINT i", o: ["4", "5", "3", "6"], a: "4" },
      { q: "Which controls loop execution?", o: ["Input", "Output", "Condition", "Variable only"], a: "Condition" },
      { q: "A loop that never stops is:", o: ["Pre-test", "Infinite loop", "Pre-test", "Selection"], a: "Infinite loop" },
      { q: "What happens if a loop condition is always true?", o: ["Stops", "Skips", "Error", "Infinite loop"], a: "Infinite loop" },
      { q: "FOR loops are best when:", o: ["Unknown repeats", "Known number of repeats", "No repeats", "Selection needed"], a: "Known number of repeats" },
      { q: "How many times does this run? FOR i = 0 TO 2 PRINT i", o: ["3", "4", "2", "Infinite"], a: "3" }
    ],
    hard: [
      { q: "Nested loops are used for:", o: ["Storage", "Input", "Decisions", "Repeating inside repeating"], a: "Repeating inside repeating" },
      { q: "What is output? FOR i = 1 TO 3 PRINT i * 2", o: ["2, 4, 6", "1, 2, 3", "6, 4, 2", "3, 2, 1"], a: "2, 4, 6" },
      { q: "What causes infinite loop?", o: ["Condition never becomes false", "Correct condition", "Output error", "Input error"], a: "Condition never becomes false" },
      { q: "How many times does this run? i <- 1 WHILE i <= 3 PRINT i, i <- i + 1", o: ["3", "4", "2", "Infinite"], a: "3" },
      { q: "Iteration is most useful for:", o: ["Decision making", "Storing data", "Repeating tasks efficiently", "Input"], a: "Repeating tasks efficiently" },
      { q: "Which of the following best describes the core mechanism of an iterative process?", o: ["Branching logic based on a single condition.", "Sequential execution of instructions", "Output of one cycle becomes the input for the next", "A static sequence of instructions run once"], a: "Output of one cycle becomes the input for the next" }
    ]
  },
  "Data Structures": {
    easy: [
      { q: "What is an array?", o: ["Loop", "Condition", "List of data", "Output"], a: "List of data" },
      { q: "Data structures store:", o: ["Code", "Data", "Array", "Loops"], a: "Data" },
      { q: "Arrays store:", o: ["One value", "Multiple values", "No values", "Conditions"], a: "Multiple values" },
      { q: "Index is:", o: ["Position", "Loop", "Condition", "Value"], a: "Position" },
      { q: "Data structues help:", o: ["Loop", "Decide", "Display", "Organise data"], a: "Organise data" },
      { q: "Which is an example of an array?", o: ["IF x = 5", "1,2,3", "FOR loop", "PRINT x"], a: "1,2,3" }
    ],
    medium: [
      { q: "What is the first index of most arrays?", o: ["0", "1", "2", "-1"], a: "0" },
      { q: "What happens if you access an index that doesn't exist?", o: ["Syntax error", "Runtime error", "Logical error", "Nothing"], a: "Runtime error" },
      { q: "What will this output? arr = [10,20,30] PRINT arr[0]", o: ["10", "20", "30", "Error"], a: "10" },
      { q: "Arrays are best used when:", o: ["One value is needed", "Many related values are needed", "No data is needed", "Only loops are used"], a: "Many related values are needed" },
      { q: "Which structure is used for breadth-first search?", o: ["Stack", "Queue", "Array", "Tree"], a: "Queue" },
      { q: "What does this mean? arr[2]", o: ["Second value", "First value", "Third value", "Error"], a: "Third value" }
    ],
    hard: [
      { q: "What will this output? arr=[5,10,15] PRINT arr[1] + arr[2]", o: ["15", "20", "25", "25"], a: "25" },
      { q: "What type of error occurs here? arr = [1,2,3] PRINT arr[5]", o: ["Logical", "Syntax", "Runtime", "No error"], a: "Runtime" },
      { q: "Arrays are considered:", o: ["Unordererd", "Ordered data structures", "Random", "Conditional"], a: "Ordered data structures" },
      { q: "Which operation is commonly used with arrays?", o: ["Iteration", "Selection only", "Output only", "Input only"], a: "O(log n)" },
      { q: "What is the length of this array? arr = [2,4,6,8]", o: ["3", "4", "5", "2"], a: "4" },
      { q: "What will this output? arr = [1,2,3] FOR i = 0 TO 2 PRINT arr[i]", o: ["1 2 3", "0 1 2", "3 2 1", "Error"], a: "1 2 3" }
    ]
  },
  "Basic Algorithms": {
    easy: [
      { q: "What is an algorithm?", o: ["A loop", "A variable", "Step by step instructions", "An array"], a: "Step-by-step instructions" },
      { q: "Algorithims are used to:", o: ["Store data", "Solve problems", "Print output", "Design UI"], a: "Solve problems" },
      { q: "Algorithims must be:", o: ["Random", "Clear and ordered", "Long", "Complex"], a: "Clear and ordered" },
      { q: "What do algorithims follow?", o: ["Random steps", "Ordererd steps", "Loops only", "Conditions only"], a: "Ordererd steps" },
      { q: "Algorithims are written using:", o: ["Only code", "Only loops", "Only variables", "Logic and steps"], a: "Logic and steps" },
      { q: "Which is an example of an algorithim?", o: ["A list of steps to solve a problem", "A single variable", "A colour design", "A button"], a: "A list of steps to solve a problem" }
    ],
    medium: [
      { q: "Which can represent and algorithim?", o: ["Code", "Pseudocode", "Flowchart", "All of the above"], a: "All of the above" },
      { q: "Why must algorithims be finite?", o: ["To repeat forever", "To eventually stop", "To store data", "To print output"], a: "To eventually stop" },
      { q: "What is pseudocode", o: ["Real programming language", "Structured way to describe logic", "Loop", "Variable"], a: "Structured way to describe logic" },
      { q: "Flowcharts are used to:", o: ["Store data", "Show logic visually", "Run code", "Print output"], a: "Show logic visually" },
      { q: "Good algorithms are:", o: ["Efficient and clear", "Long", "Complex", "Random"], a: "Efficient and clear" },
      { q: "Which algorithm is divide and conquer?", o: ["Merge sort", "Linear search", "Bubble sort", "Queue"], a: "Merge sort" }
    ],
    hard: [
      { q: "What is the main goal of an algorithim?", o: ["Look good", "Solve a problem correctly", "Run forever)", "Store data"], a: "Solve a problem correctly" },
      { q: "What will this output? x <- 3, x <- x + 2, PRINT x", o: ["3", "5", "2", "Error"], a: "5" },
      { q: "Algorithim effiency refers to:", o: ["Colour", "Speed and performance", "Input", "Output"], a: "Speed and performance" },
      { q: "What happens if an algorithm is incorrect?", o: ["Better output", "Faster speed", "No change", "Wrong results"], a: "Wrong results" },
      { q: "Algorithms rely on:", o: ["Logic and structure", "Colour", "Design", "Input only"], a: "Logic and structure" },
      { q: "What is the output? x <- 1, IF x = 1 THEN, PRINT 'Yes' ELSE PRINT 'No'", o: ["No", "Error", "Yes", "Both"], a: "Yes" }
    ]
  }
};
