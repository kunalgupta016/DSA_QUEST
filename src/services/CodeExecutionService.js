export const LANGUAGES = {
    javascript: {
        id: 'javascript',
        version: '18.15.0',
        monacoLanguage: 'javascript',
        defaultCode: `// Write your JavaScript code here
function solve() {
  console.log("Hello from JavaScript!");
}
solve();`
    },
    python: {
        id: 'python',
        version: '3.10.0',
        monacoLanguage: 'python',
        defaultCode: `# Write your Python code here
def solve():
    print("Hello from Python!")

if __name__ == "__main__":
    solve()`
    },
    java: {
        id: 'java',
        version: '15.0.2',
        monacoLanguage: 'java',
        defaultCode: `// Write your Java code here
public class Main {
    public static void main(String[] args) {
        System.out.println("Hello from Java!");
    }
}`
    },
    cpp: {
        id: 'c++',
        version: '10.2.0',
        monacoLanguage: 'cpp',
        defaultCode: `// Write your C++ code here
#include <iostream>

int main() {
    std::cout << "Hello from C++!" << std::endl;
    return 0;
}`
    },
    c: {
        id: 'c',
        version: '10.2.0',
        monacoLanguage: 'c',
        defaultCode: `// Write your C code here
#include <stdio.h>

int main() {
    printf("Hello from C!\\n");
    return 0;
}`
    }
};

const PISTON_API_URL = "https://emkc.org/api/v2/piston";

export const executeCode = async (language, sourceCode) => {
    try {
        const response = await fetch(`${PISTON_API_URL}/execute`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                language: LANGUAGES[language].id,
                version: LANGUAGES[language].version,
                files: [
                    {
                        content: sourceCode
                    }
                ]
            })
        });

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Execution error:", error);
        return { run: { output: "Error connecting to execution server." } };
    }
};
