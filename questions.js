const quizData = {
  general: {
    easy: [
      { q: "Capital of France?", o: ["Paris", "Rome", "Berlin", "Madrid"], a: "Paris" },
      { q: "Largest ocean on Earth?", o: ["Atlantic", "Indian", "Arctic", "Pacific"], a: "Pacific" },
      { q: "How many continents?", o: ["5", "6", "7", "8"], a: "7" },
      { q: "Which planet is known as the Red Planet?", o: ["Venus", "Mars", "Jupiter", "Saturn"], a: "Mars" },
      { q: "Water boils at sea level at about?", o: ["90°C", "100°C", "80°C", "120°C"], a: "100°C" },
      { q: "Which animal is known as the King of the Jungle?", o: ["Tiger", "Lion", "Bear", "Elephant"], a: "Lion" }
    ],
    medium: [
      { q: "Earth is?", o: ["Flat", "Round", "Square", "Triangle"], a: "Round" },
      { q: "Author of 'Romeo and Juliet'?", o: ["Charles Dickens", "William Shakespeare", "Jane Austen", "Mark Twain"], a: "William Shakespeare" },
      { q: "Chemical symbol for gold?", o: ["Go", "Gd", "Au", "Ag"], a: "Au" },
      { q: "Longest river in the world?", o: ["Amazon", "Nile", "Yangtze", "Mississippi"], a: "Nile" },
      { q: "Which gas do plants absorb from the air?", o: ["Oxygen", "Nitrogen", "Carbon dioxide", "Hydrogen"], a: "Carbon dioxide" },
      { q: "In which country would you find the ancient city of Petra?", o: ["Egypt", "Jordan", "Greece", "Turkey"], a: "Jordan" }
    ],
    hard: [
      { q: "When was Matej born?", o: ["1945", "1939", "1918", "1960"], a: "1945" },
      { q: "Who painted the ceiling of the Sistine Chapel?", o: ["Leonardo da Vinci", "Michelangelo", "Raphael", "Donatello"], a: "Michelangelo" },
      { q: "Theory of relativity is most associated with?", o: ["Newton", "Einstein", "Bohr", "Curie"], a: "Einstein" },
      { q: "Ancient wonder still standing today?", o: ["Colossus of Rhodes", "Great Pyramid of Giza", "Hanging Gardens", "Lighthouse of Alexandria"], a: "Great Pyramid of Giza" },
      { q: "Longest mountain range on Earth?", o: ["Himalayas", "Rockies", "Andes", "Alps"], a: "Andes" },
      { q: "Treaty that ended WW1?", o: ["Treaty of Paris", "Treaty of Versailles", "Treaty of Vienna", "Treaty of Utrecht"], a: "Treaty of Versailles" }
    ]
  },
  math: {
    easy: [
      { q: "7 + 5 = ?", o: ["10", "11", "12", "13"], a: "12" },
      { q: "15 − 8 = ?", o: ["5", "6", "7", "8"], a: "7" },
      { q: "4 × 3 = ?", o: ["10", "11", "12", "14"], a: "12" },
      { q: "Half of 30 is?", o: ["10", "12", "15", "20"], a: "15" },
      { q: "Which is largest?", o: ["0.9", "0.75", "0.85", "0.6"], a: "0.9" },
      { q: "Perimeter of a square with side 4?", o: ["8", "12", "16", "20"], a: "16" }
    ],
    medium: [
      { q: "9 × 6 = ?", o: ["45", "52", "54", "56"], a: "54" },
      { q: "144 ÷ 12 = ?", o: ["10", "11", "12", "14"], a: "12" },
      { q: "20% of 250?", o: ["40", "45", "50", "55"], a: "50" },
      { q: "Area of a rectangle 7 by 8?", o: ["54", "56", "63", "64"], a: "56" },
      { q: "If 3x = 21, what is x?", o: ["5", "6", "7", "8"], a: "7" },
      { q: "√81 = ?", o: ["7", "8", "9", "10"], a: "9" }
    ],
    hard: [
      { q: "If x + 3 = 11, what is x?", o: ["6", "7", "8", "9"], a: "8" },
      { q: "Value of 2⁵?", o: ["16", "24", "32", "64"], a: "32" },
      { q: "Slope between (0,0) and (4,8)?", o: ["1", "2", "3", "4"], a: "2" },
      { q: "Sum of angles in a triangle (degrees)?", o: ["90", "180", "270", "360"], a: "180" },
      { q: "If y = 2x − 5 and x = 4, what is y?", o: ["2", "3", "4", "5"], a: "3" },
      { q: "Total (principal + simple interest): $200 at 10%/year for 2 years?", o: ["$220", "$235", "$240", "$260"], a: "$240" }
    ]
  },
  tech: {
    easy: [
      { q: "What does CPU stand for?", o: ["Central Processing Unit", "Computer Personal Unit", "Core Program Utility", "Central Print Utility"], a: "Central Processing Unit" },
      { q: "What does RAM stand for?", o: ["Random Access Memory", "Read Access Module", "Rapid Application Memory", "Run All Modules"], a: "Random Access Memory" },
      { q: "Which company makes the iPhone?", o: ["Samsung", "Google", "Apple", "Microsoft"], a: "Apple" },
      { q: "Keyboard shortcut to copy (Windows)?", o: ["Ctrl+C", "Ctrl+V", "Ctrl+X", "Ctrl+Z"], a: "Ctrl+C" },
      { q: "File extension for a Python script?", o: [".js", ".py", ".java", ".cpp"], a: ".py" },
      { q: "What does URL stand for?", o: ["Uniform Resource Locator", "Universal Reference Link", "Unified Routing Layer", "User Record List"], a: "Uniform Resource Locator" }
    ],
    medium: [
      { q: "HTTP stands for?", o: ["HyperText Transfer Protocol", "High Transfer Text Process", "Host Text Transmission Program", "Hyperlink Text Transport Path"], a: "HyperText Transfer Protocol" },
      { q: "Which port is commonly used for HTTPS?", o: ["80", "443", "8080", "22"], a: "443" },
      { q: "SQL is mainly used for?", o: ["Graphics", "Databases", "Networking", "Compression"], a: "Databases" },
      { q: "Git is primarily a?", o: ["Text editor", "Version control system", "Database", "Browser"], a: "Version control system" },
      { q: "IPv4 address uses how many bits?", o: ["16", "32", "64", "128"], a: "32" },
      { q: "CSS is used to style?", o: ["Servers", "Web pages", "Databases", "Compilers"], a: "Web pages" }
    ],
    hard: [
      { q: "Which base does binary use?", o: ["Base 8", "Base 10", "Base 2", "Base 16"], a: "Base 2" },
      { q: "Big O for binary search on a sorted array?", o: ["O(n)", "O(log n)", "O(n²)", "O(1)"], a: "O(log n)" },
      { q: "Which HTTP method is idempotent and safe?", o: ["POST", "PATCH", "GET", "CONNECT"], a: "GET" },
      { q: "In OSI model, TCP lives closest to?", o: ["Application layer", "Transport layer", "Physical layer", "Session layer"], a: "Transport layer" },
      { q: "SHA-256 produces a digest of how many bits?", o: ["128", "160", "256", "512"], a: "256" },
      { q: "CAP theorem: pick two of consistency, availability, and?", o: ["Scalability", "Partition tolerance", "Latency", "Throughput"], a: "Partition tolerance" }
    ]
  }
};
