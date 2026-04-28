# Data and Debugging:
## Data Dictionary:
<img width="904" height="1059" alt="Screenshot 2026-04-22 at 5 33 19 pm" src="https://github.com/user-attachments/assets/40233b30-a713-448c-9d7e-45fdc6ab20e0" />
<img width="791" height="886" alt="Screenshot 2026-04-22 at 5 34 04 pm" src="https://github.com/user-attachments/assets/0da33ffd-9da4-4878-a7a6-5ac91fd35d4d" />
<img width="790" height="845" alt="Screenshot 2026-04-22 at 5 34 26 pm" src="https://github.com/user-attachments/assets/0bd6df79-af68-4d3c-8c24-6ae315867d4c" />






---

This data dictionary highlights all the main variables utilised in the system and explains what each one does. It involves variables such as the user's score, the current level, the questions, and others. Each variable has a data type, so it shows the program what kind of data it should store. Furthermore, the data dictionary includes its size for display alongside a description, example and validation. For instance, the score must always be greater than zero, and the answer must match the options displayed.

The data dictionary makes the program much easier to understand since you can see how the data is organised and utilised throughout the system.

---

## Report on Debugging Tools:
During the development of 'Algorithm Academy', I faced several debugging tools that were utilised to fix the issues in the code. The main tools that were used were Visual Studio Code, which aided detect erros such as incorrect variables, missing brackets and other issues. It made it easier to rapidly identify mistakes while writing code.

Console logging was used throughout the system to track variable values. For instance:

```javascript
console.log("Current difficulty:", difficulty);
console.log("Score:", score);
```

This helped identify issues with quiz progression.

Furthermore, another major obstacle occurred with difficulty progression. After completing the easy level, the quiz would reset instead of moving to medium. It was fixed by updating the logic with this code:

```javascript
if (score >= passMark && difficulty === "easy") {
    difficulty = "medium";
} else if (score >= passMark && difficulty === "medium") {
    difficulty = "hard";
}
```
Moreover, another problem occurred regarding checking answers. The system was not recognising correct answers. 

```javascript
if (user_answer === correct_answer) {
    result = true;
}
```
Regular testing was carried out after implementing features such as the timer and feedback system. Overall, the use of Visual Studio Code as well as the browser console allowed errors to be identified and fixed efficiently, resulting in a more reliable web application. 

