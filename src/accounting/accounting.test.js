// accounting.test.js
// Unit tests for the Node.js accounting application, mirroring the COBOL test plan

const { spawn } = require('child_process');
const path = require('path');

const appPath = path.join(__dirname, 'index.js');

// Helper to run the CLI app and interact with it
function runApp(inputs) {
  return new Promise((resolve) => {
    const proc = spawn('node', [appPath], { stdio: ['pipe', 'pipe', 'pipe'] });
    let output = '';
    proc.stdout.on('data', (data) => {
      output += data.toString();
      // Auto-feed next input if prompt is detected
      if (inputs.length > 0 && /Enter (your choice|credit amount|debit amount)/.test(output)) {
        proc.stdin.write(inputs.shift() + '\n');
      }
    });
    proc.stderr.on('data', (data) => {
      output += data.toString();
    });
    proc.on('close', () => {
      resolve(output);
    });
  });
}

describe('Accounting App CLI', () => {
  test('TC001: Verify initial balance display', async () => {
    const output = await runApp(['1', '4']);
    expect(output).toMatch(/Current balance: 001000.00/);
  });

  test('TC002: Verify credit operation with valid amount', async () => {
    const output = await runApp(['2', '500', '1', '4']);
    expect(output).toMatch(/Amount credited. New balance: 001500.00/);
    expect(output).toMatch(/Current balance: 001500.00/);
  });

  test('TC003: Verify debit operation with sufficient funds', async () => {
    const output = await runApp(['2', '500', '3', '200', '1', '4']);
    expect(output).toMatch(/Amount debited. New balance: 001300.00/);
    expect(output).toMatch(/Current balance: 001300.00/);
  });

  test('TC004: Verify debit operation with insufficient funds', async () => {
    const output = await runApp(['3', '2000', '4']);
    expect(output).toMatch(/Insufficient funds for this debit/);
  });

  test('TC005: Verify invalid menu choice handling', async () => {
    const output = await runApp(['5', '4']);
    expect(output).toMatch(/Invalid choice, please select 1-4/);
  });

  test('TC006: Verify exit functionality', async () => {
    const output = await runApp(['4']);
    expect(output).toMatch(/Exiting the program. Goodbye!/);
  });

  test('TC007: Verify balance persistence across operations', async () => {
    const output = await runApp(['2', '100', '3', '50', '1', '2', '25', '1', '4']);
    expect(output).toMatch(/Current balance: 001050.00/);
    expect(output).toMatch(/Current balance: 001075.00/);
  });

  test('TC008: Verify credit with zero amount', async () => {
    const output = await runApp(['2', '0', '1', '4']);
    expect(output).toMatch(/Amount credited. New balance: 001000.00/);
    expect(output).toMatch(/Current balance: 001000.00/);
  });

  test('TC009: Verify debit with exact balance amount', async () => {
    const output = await runApp(['3', '1000', '1', '4']);
    expect(output).toMatch(/Amount debited. New balance: 000000.00/);
    expect(output).toMatch(/Current balance: 000000.00/);
  });

  test('TC010: Verify menu loop continuation', async () => {
    const output = await runApp(['1', '2', '10', '3', '5', '4']);
    // Should see menu multiple times
    const menuCount = (output.match(/Account Management System/g) || []).length;
    expect(menuCount).toBeGreaterThan(1);
  });
});
