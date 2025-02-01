const {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} = require("@google/generative-ai");

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash-exp",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "application/json",
};

export const courseOutlineAiModel = model.startChat({
  generationConfig,
  history: [
    {
      role: "user",
      parts: [
        {
          text: "generate a study material for python for exam and level of difficulty will be easy with summary of course,list of chapters along with summary for each chapter,topic list in each chapter , all result in JSON format\n",
        },
      ],
    },
    {
      role: "model",
      parts: [
        {
          text: '```json\n{\n  "course_title": "Introduction to Python Programming",\n  "course_summary": "This course provides a beginner-friendly introduction to Python programming. It covers fundamental concepts like data types, control flow, functions, and basic data structures. The focus is on building a solid foundation for further Python learning and application.",\n  "difficulty_level": "Easy",\n  "chapters": [\n    {\n      "chapter_number": 1,\n      "chapter_title": "Getting Started with Python",\n      "chapter_summary": "This chapter introduces you to Python, explains why it\'s popular, and guides you through setting up your Python environment. You\'ll learn how to write and execute your first Python program.",\n      "topics": [\n        "What is Python?",\n        "Why Python is popular",\n        "Setting up Python (Installation)",\n        "Running Python code",\n         "Basic Syntax (Comments)",\n          "First Python Program (\'Hello, World!\')"\n       ]\n    },\n    {\n      "chapter_number": 2,\n      "chapter_title": "Variables and Data Types",\n      "chapter_summary": "Learn about variables, how to store information in them, and the fundamental data types in Python, such as integers, floats, strings, and booleans. You\'ll also explore type conversion.",\n       "topics": [\n        "Variables: Defining and naming",\n        "Data types: Integer, Float, String, Boolean",\n        "Type conversion (casting)",\n        "Basic Input/Output (using print() and input())"\n      ]\n    },\n     {\n      "chapter_number": 3,\n      "chapter_title": "Operators in Python",\n      "chapter_summary": "This chapter covers the various operators used in Python, including arithmetic, comparison, and logical operators. Understanding operators is crucial for performing computations and making decisions in your code.",\n       "topics": [\n        "Arithmetic operators (+, -, *, /, %, //, **)",\n        "Assignment operators (=, +=, -=, *=, /=)",\n        "Comparison operators (==, !=, >, <, >=, <=)",\n        "Logical operators (and, or, not)"\n        ]\n      },\n    {\n      "chapter_number": 4,\n       "chapter_title": "Control Flow: Conditional Statements",\n      "chapter_summary": "This chapter introduces conditional statements (`if`, `elif`, `else`) to control the flow of execution based on different conditions. You\'ll learn how to make your programs respond differently to different inputs.",\n      "topics":[\n          "if statement",\n          "if-else statement",\n          "if-elif-else statement",\n          "Nested if statements"\n        ]\n    },\n      {\n      "chapter_number": 5,\n      "chapter_title": "Control Flow: Loops",\n       "chapter_summary":"Learn how to repeat blocks of code using `for` and `while` loops. You\'ll learn to iterate over sequences and execute code based on conditions. We will also explore break and continue statments",\n      "topics": [\n        "for loop",\n        "while loop",\n        "Loop control statements (break, continue)",\n        "Looping through strings and lists (basic introduction)"\n      ]\n    },\n       {\n      "chapter_number": 6,\n      "chapter_title": "Introduction to Lists",\n       "chapter_summary":"This chapter introduces you to lists. You will learn how to create, access, modify and iterate through them.",\n      "topics": [\n         "Creating a list",\n         "Accessing list elements",\n         "Modifying lists",\n         "List slicing",\n          "Basic list operations (append, insert, remove, len)"\n        ]\n      },\n    {\n       "chapter_number": 7,\n       "chapter_title": "Defining and Calling Functions",\n       "chapter_summary": "This chapter introduces the concept of functions to modularize code. You\'ll learn how to define functions, pass arguments, and return values. Understanding functions helps in writing reusable and organized code.",\n       "topics": [\n            "Defining functions (def keyword)",\n            "Function parameters and arguments",\n            "Returning values from functions",\n             "Calling a function",\n            "Introduction to scope"\n\n         ]\n    }\n\n  ]\n}\n```\n',
        },
      ],
    },
  ],
});

// const result = await chatSession.sendMessage("INSERT_INPUT_HERE");
// console.log(result.response.text());
