# Data and Debugging:
## Data Dictionary:

| Variable | Data Type | Format for Display | Size for Display | Description | Example | Validation |
|----------|-----------|--------------------|------------------|-------------|---------|------------|
| quiz_started | Boolean | True or False | 1 | Tracks if the quiz has started | True | Has to be true or false |
| quiz_finished | Boolean | True/False | 1 | Tracks if quiz has ended | False | Must be true or false |
| score | Integer | Number | 1-3 | Captures the user score | 10 | Must be over 0 |
| level | Integer | Number | 1-2 | The current level of the game | 3 | Must be between 1 and 10 levels |
| total_level | Integer | Number | 1-2 | Total number of levels | 10 | Must be over 1 |
| topic | String | Text | 1-20 | Quiz topic | "Sequence" | Must match the available topics |
| difficulty | String | Text | 1-10 | Difficulty level | "Medium" | Has to be Easy, Medium or Hard |
| user_answer | String | Text | 1-20 | Answer selected by the user | 'C' | Must be an answer from the options given |
| correct_answer | String | Text | 1-20 | Correct answer | 'C' | Must be the same as the answer |
| question | String | Text | 1-50 | The question that the user is faced with | "What does iteration, sequence and selection mean?" | Cannot be empty |
| options | Array | List of strings | 1-5 | Stores the multiple choice questions | 'A','B','C','D' | Must include at least two options |
| result | Boolean | True/False | 1 | Demonstrates if the answer is correct | False | Has to be true or false |
| feedback | String | Text | 1-50 | Message shown after answering the question | "Incorrect" | Can't be empty |
| attempts | Integer | Number | 1-2 | Number of attempts on a question | 3 | Must be over 0 |
| timer | Integer | Number | 1-60 | Time remaining on a question | 30 | Must be over 0 |
| time_limit | Integer | Number | 1-3 | Maximum amount of time allowed | 15 | Has to be over 1 |
| time_taken | Integer | Number | 1-3 | Total time taken for quiz | 10 | Has to be over 0 |
| progress | Integer | Percentage | 1-3 | Bar that tracks your progress with the quiz | 30% | Has to be 0-100 |
| streak | Integer | Number | 1-2 | Consecutive correct answers (with fire symbol and message) | 3 | Has to be over 0 |
| high_score | Integer | Number | 1-3 | Highest personal score achieved | 8 | Has to be over 0 |
| sound_on | Boolean | True/False | 1 | Controls the music in the background as well as the sound effects when the answer is correct or incorrect | True | Has to be true or false |
| volume | Integer | Number | 0-100 | Controls sound volume | 60 | Has to be 0-100 |
| username | String | Text | 1-20 | User's username | "MatejABC" | Can't be empty |
| password | String | Text | 1-20 | User's password | "Matej123" | Has to be minimum 4 characters |
| confirm_password | String | Text | 1-20 | Confirms password during sign up | "Matej123" | Has to match the password entered before |
| is_logged_in | Boolean | True/False | 1 | Traces if the user is logged in | False | Has to be true or false |
| users | Array | List of objects | 1 | Stores all users logged in | "Matej, Matej123" | Can't be empty |
| current_user | Object | Object | 1 | Stores current user logged in | "Matej" | Has to match existing user |
| xp | Integer | Number | 1-4 | Experience points gained by the user per correct questions and streak | 170 | Has to be over 0 |
| xp_gain | Integer | Number | 1-3 | XP earned after every correct answer and quiz attempt | 50 | Has to be over 0 |
| level_rank | Integer | Number | 1-2 | Represents the user’s level based on xp earned | Level 10 | Has to be over 0 |
| badges | Array | List of strings | 1-10 | Badges earned by the user | Bronze, Gold, Diamond | Has to have the badge names |
| new_badge | String | Text | 1-10 | Badge earned | Crown | Must match the badge list |

## Description of Data Dictionary

The data dictionary outlines all of the variables utilised throughout the Algorithm Academy quiz application. It explains the type of data each variable stores, how it is displayed, what it is used for in the system, and the validation needed to keep the application functioning correctly. It involves variables such as the user's score, the current level, the questions, and others.

The data dictionary makes the program much easier to understand since you can see how the data is organised and utilised throughout the system.

---

## Report on Debugging Tools:

| Error Type | Issue Description | Issue on System | Resolution |
|------------|-------------------|-----------------|------------|
| Logical Error | Difficulty was not updating after completing a level | The quiz kept restarting on Easy instead of moving to Medium | Updated condition to correctly change difficulty based on the current level |
| Syntax Error | Used `=` instead of `===` | Answers were marked incorrectly or behaved in unexpected ways | Replaced with the correct comparison operator (`===` instead of `=`) |
| Reference Error | The variable was not defined | Console error stopped execution | Declared variables before use |
| Input Validation Error | Empty name allowed | The user could start the quiz without entering their name | Added validation checks to prevent empty input and display an alert |
| UI/Layout Issue | The feedback message caused the container to resize | Buttons shifted, causing misclicks | Fixed layout using consistent spacing |
| Logic Error | Sound effects depended on the music being enabled | Sound effects did not play when the music was off | Separated sound effects and music into independent controls |
| Runtime Error | Function not called | Certain features, such as scores and progression updates, did not execute | Ensured functions were correctly called at the right time |

## Description of Errors Fixed
During the development of 'Algorithm Academy', I was faced with several errors that were identified and resolved. Initially, logical errors were the most common, specifically in the progression element, where the difficulty level was not updating correctly. As a result, the quiz restarted instead of moving on and was fixed by improving the conditional logic.

Additionally, syntax errors were also a major obstacle that involved using the wrong comparison operator, which led to incorrect answer validation. This was resolved by implementing the correct operator (===). Reference errors occurred when variables were used before being identified and declared, which stopped the program from running until they were properly defined.

Moreover, input validation issues allowed users to enter the quiz without entering information, reducing usability. This was fixed by adding checks to ensure valid input. A UI issue was also identified when feedback messages caused layout shifting, which often led to misclicks and incorrect answers. This was fixed by stabilising the layout.

Ultimately, a logic issue with the audio system caused sound effects to depend on background music and could not work when the music was off. This was fixed by separating the two systems so they function independently. 
