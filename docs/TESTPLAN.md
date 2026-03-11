# COBOL Student Account System Test Plan

This test plan outlines the business logic and implementation details of the legacy COBOL student account management system. It is designed to validate functionality with business stakeholders and will serve as the foundation for creating unit and integration tests in the upcoming Node.js transformation.

The test cases cover all key features: menu navigation, balance viewing, crediting, debiting, and error handling. Each test case includes steps to simulate user interactions via the console interface.

| Test Case ID | Test Case Description | Pre-conditions | Test Steps | Expected Result | Actual Result | Status (Pass/Fail) | Comments |
|--------------|-----------------------|----------------|------------|----------------|----------------|---------------------|-----------|
| TC001 | Verify initial balance display | Application is compiled and executable is present. Initial balance is 1000.00. | 1. Run `./accountsystem`<br>2. Select option 1 (View Balance)<br>3. Observe output | Current balance: 001000.00 is displayed. |  |  |  |
| TC002 | Verify credit operation with valid amount | Application is running. Current balance is 1000.00. | 1. Select option 2 (Credit Account)<br>2. Enter amount: 500.00<br>3. Observe output<br>4. Select option 1 to view balance | Amount credited. New balance: 001500.00 is displayed, and subsequent view confirms balance update. |  |  |  |
| TC003 | Verify debit operation with sufficient funds | Application is running. Current balance is 1500.00 (from TC002). | 1. Select option 3 (Debit Account)<br>2. Enter amount: 200.00<br>3. Observe output<br>4. Select option 1 to view balance | Amount debited. New balance: 001300.00 is displayed, and subsequent view confirms balance update. |  |  |  |
| TC004 | Verify debit operation with insufficient funds | Application is running. Current balance is 1300.00 (from TC003). | 1. Select option 3 (Debit Account)<br>2. Enter amount: 2000.00<br>3. Observe output | "Insufficient funds for this debit." is displayed. Balance remains unchanged. |  |  | Business rule: Prevent overdraft. |
| TC005 | Verify invalid menu choice handling | Application is running. | 1. Enter invalid choice: 5<br>2. Observe output | "Invalid choice, please select 1-4." is displayed. Menu redisplays. |  |  |  |
| TC006 | Verify exit functionality | Application is running. | 1. Select option 4 (Exit)<br>2. Observe output | "Exiting the program. Goodbye!" is displayed. Program terminates. |  |  |  |
| TC007 | Verify balance persistence across operations | Application is running. Perform sequence of operations. | 1. Start with initial balance 1000.00<br>2. Credit 100.00<br>3. Debit 50.00<br>4. View balance<br>5. Credit 25.00<br>6. View balance | Balance updates correctly: 1000 -> 1100 -> 1050 -> 1075. All displays match expected values. |  |  | Ensures data integrity via DataProgram. |
| TC008 | Verify credit with zero amount | Application is running. Current balance is known. | 1. Select option 2 (Credit Account)<br>2. Enter amount: 0.00<br>3. Observe output and view balance | Amount credited. New balance remains the same (zero credit allowed but no change). |  |  | Edge case: Zero transactions. |
| TC009 | Verify debit with exact balance amount | Application is running. Set balance to 500.00 via prior credits/debits. | 1. Select option 3 (Debit Account)<br>2. Enter amount: 500.00<br>3. Observe output and view balance | Amount debited. New balance: 000000.00. |  |  | Edge case: Exact withdrawal. |
| TC010 | Verify menu loop continuation | Application is running. | 1. Perform multiple valid operations (e.g., view, credit, debit)<br>2. Ensure menu redisplays after each | Menu continues to display after each operation until exit is chosen. |  |  | Validates loop logic in MainProgram. |

## Notes
- All amounts are in dollars with two decimal places (e.g., 1000.00).
- The application uses console I/O; tests assume interactive input.
- Business rules enforced: Initial balance 1000.00, no overdraft on debit, valid menu choices only.
- This plan will be used to create automated tests in Node.js, simulating the COBOL logic.</content>
<parameter name="filePath">/workspaces/skills-modernize-your-legacy-code-with-github-copilot-week4-ghcp/docs/TESTPLAN.md