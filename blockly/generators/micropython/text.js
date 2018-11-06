/**
 * @license Licensed under the Apache License, Version 2.0 (the "License"):
 *          http://www.apache.org/licenses/LICENSE-2.0
 */

/**
 * @fileoverview Arduino code generator for the text blocks.
 *     Partially implements the Arduino Serial interface as described in:
 *     http://arduino.cc/en/Reference/Serial
 *
 * TODO: Too many calls to String constructor, which consumes a lot of uC
 *     resources. This will need revisiting for better type recognition.
 *
 * TODO: Trim generator is not correct.
 */
'use strict';

goog.provide('Blockly.Micropython.text');

goog.require('Blockly.Micropython');


///**
// * Code generator for a literal String (X).
// * Arduino code: loop { "X" }
// * @param {!Blockly.Block} block Block to generate the code from.
// * @return {array} Completed code with order of operation.
// */
//Blockly.Micropython['text'] = function(block) {
//  var code = Blockly.Micropython.quote_(block.getFieldValue('TEXT'));
//  return [code, Blockly.Micropython.ORDER_ATOMIC];
//};

///**
// * Code generator for a String concatenation (X...Y). This string can be made
// * up of any number of elements of any type.
// * This block uses a mutator.
// * String construction info: http://arduino.cc/en/Reference/StringConstructor
// * Arduino code: loop { "String(X)" + ... + "String(Y)" }
// * @param {!Blockly.Block} block Block to generate the code from.
// * @return {array} Completed code with order of operation.
// */
//Blockly.Micropython['text_join'] = function(block) {
//  var code;
//  if (block.itemCount_ == 0) {
//    return ['""', Blockly.Micropython.ORDER_ATOMIC];
//  } else if (block.itemCount_ == 1) {
//    var argument0 = Blockly.Micropython.valueToCode(block, 'ADD0',
//        Blockly.Micropython.ORDER_UNARY_POSTFIX) || '""';
//    code = 'String(' + argument0 + ')';
//    return [code, Blockly.Micropython.ORDER_UNARY_POSTFIX];
//  } else {
//    var argument;
//    code = [];
//    for (var n = 0; n < block.itemCount_; n++) {
//      argument = Blockly.Micropython.valueToCode(
//          block, 'ADD' + n, Blockly.Micropython.ORDER_NONE);
//      if (argument == '') {
//        code[n] = '""';
//      } else {
//        code[n] = 'String(' + argument + ')';
//      }
//    }
//    code = code.join(' + ');
//    return [code, Blockly.Micropython.ORDER_UNARY_POSTFIX];
//  }
//};

///**
// * Code generator for appending text (Y) to a variable in place (X).
// * String constructor info: http://arduino.cc/en/Reference/StringConstructor
// * Arduino code: loop { X += String(Y) }
// * @param {!Blockly.Block} block Block to generate the code from.
// * @return {string} Completed code.
// */
//Blockly.Micropython['text_append'] = function(block) {
//  // Append to a variable in place.
//  var varName = Blockly.Micropython.variableDB_.getName(
//      block.getFieldValue('VAR'), Blockly.Variables.NAME_TYPE);
//  var argument0 = Blockly.Micropython.valueToCode(block, 'TEXT',
//      Blockly.Micropython.ORDER_UNARY_POSTFIX);
//  if (argument0 == '') {
//    argument0 = '""';
//  } else {
//    argument0 = 'String(' + argument0 + ')';
//  }
//  return varName + ' += ' + argument0 + ';\n';
//};

///**
// * Code generator to get the length of a string (X).
// * String length info: http://arduino.cc/en/Reference/StringLength
// * Arduino code: loop { String(X).length() }
// * @param {!Blockly.Block} block Block to generate the code from.
// * @return {array} Completed code with order of operation.
// */
//Blockly.Micropython['text_length'] = function(block) {
//  var argument0 = Blockly.Micropython.valueToCode(block, 'VALUE',
//      Blockly.Micropython.ORDER_UNARY_POSTFIX) || '""';
//  var code = 'String(' + argument0 + ').length()';
//  return [code, Blockly.Micropython.ORDER_UNARY_POSTFIX];
//};

///**
// * Code generator to test if a string (X) is null/empty.
// * String length info: http://arduino.cc/en/Reference/StringLength
// * Arduino code: boolean isStringEmpty(...) { ... }
// *               loop { isStringEmpty(X) }
// * @param {!Blockly.Block} block Block to generate the code from.
// * @return {array} Completed code with order of operation.
// */
//Blockly.Micropython['text_isEmpty'] = function(block) {
//  var func = [];
//  func.push('boolean ' + Blockly.Micropython.DEF_FUNC_NAME + '(String msg) {');
//  func.push('  if (msg.length() == 0) {');
//  func.push('    return true;');
//  func.push('  } else {');
//  func.push('    return false;');
//  func.push('  }');
//  func.push('}');
//  var funcName = Blockly.Micropython.addFunction('isStringEmpty', func.join('\n'));
//  var argument0 = Blockly.Micropython.valueToCode(block, 'VALUE',
//      Blockly.Micropython.ORDER_UNARY_POSTFIX);
//  if (argument0 == '') {
//    argument0 = '""';
//  } else {
//    argument0 = 'String(' + argument0 + ')';
//  }
//  var code = funcName + '(' + argument0 + ')';
//  return [code, Blockly.Micropython.ORDER_UNARY_POSTFIX];
//};

///**
// * Code generator to trim spaces from a string (X).
// * String trim info: http://arduino.cc/en/Tutorial/StringLengthTrim
// * Arduino code: loop { String(X).trim() }
// * @param {!Blockly.Block} block Block to generate the code from.
// * @return {array} Completed code with order of operation.
// */
//Blockly.Micropython['text_trim'] = function(block) {
//  // Trim spaces.
//  Blockly.Micropython.text_trim.OPERATORS = {
//    LEFT: '.trim()',
//    RIGHT: '.trim()',
//    BOTH: '.trim()'
//  };
//  var mode = block.getFieldValue('MODE');
//  var operator = Blockly.Micropython.text_trim.OPERATORS[mode];
//  var argument0 = Blockly.Micropython.valueToCode(block, 'TEXT',
//      Blockly.Micropython.ORDER_UNARY_POSTFIX);
//  if (argument0 == '') {
//    argument0 = '""';
//  } else {
//    argument0 = 'String(' + argument0 + ')';
//  }
//  return [argument0 + operator, Blockly.Micropython.ORDER_UNARY_POSTFIX];
//};

///**
// * Code generator to print to the serial comm.
// * Serial info: http://arduino.cc/en/Reference/Serial
// * Arduino code: setup { Serial.begin(9600);     }
// *               loop  { Serial.print(String(X)) }
// * @param {!Blockly.Block} block Block to generate the code from.
// * @return {string} Completed code.
// */
//Blockly.Micropython['text_print'] = function(block) {
//  var serialId = Blockly.Micropython.Boards.selected.serial[0][1];
//  var setupCode = serialId + '.begin(9600);';
//  Blockly.Micropython.addSetup('serial_' + serialId, setupCode, false);
//  var argument0 = Blockly.Micropython.valueToCode(block, 'TEXT',
//      Blockly.Micropython.ORDER_NONE);
//  if (argument0 == '') {
//    argument0 = '""';
//  } else {
//    argument0 = 'String(' + argument0 + ')';
//  }
//  return serialId + '.print(' + argument0 + ');\n';
//};

///**
// * Code generator to prompt the user with a string (X) and request input.
// * Serial info: http://arduino.cc/en/Reference/Serial
// * Arduino code: getUserInputPrompt(...) { ... }
// *               loop { getUserInputPrompt("X")) }
// * @param {!Blockly.Block} block Block to generate the code from.
// * @return {array} Completed code with order of operation.
// */
//Blockly.Micropython['text_prompt_ext'] = function(block) {
//  // Get the first Serial peripheral of arduino board
//  var serialId = Blockly.Micropython.Boards.selected.serial[0][1];
//  var returnType = block.getFieldValue('TYPE');

//  // The function code changes based on reading a number or string
//  var func = [];
//  var toNumber = returnType == Blockly.Types.NUMBER.output;
//  if (toNumber) {
//    func.push('int ' + Blockly.Micropython.DEF_FUNC_NAME + '(String msg) {');
//  } else {
//    func.push('String ' + Blockly.Micropython.DEF_FUNC_NAME + '(String msg) {');
//  }
//  func.push('  ' + serialId + '.println(msg);');
//  func.push('  boolean stringComplete = false;');
//  if (toNumber) {
//    func.push('  int content = 0;');// + serialId + '.parseInt();');
//  } else {
//    func.push('  String content = "";');
//  }
//  func.push('  while (stringComplete == false) {');
//  func.push('    if (' + serialId + '.available()) {');
//  if (toNumber) {
//    func.push('      content = ' + serialId + '.parseInt();');
//    func.push('      stringComplete = true;');
//  } else {
//    func.push('      char readChar = (char)' + serialId + '.read();');
//    func.push('      if (readChar == \'\\n\' || readChar == \'\\r\') {');
//    func.push('        stringComplete = true;');
//    func.push('      } else {');
//    func.push('        content += readChar;');
//    func.push('      }');
//  }
//  func.push('    }');
//  func.push('  }');
//  func.push('  // Empty incoming serial buffer');
//  func.push('  while(Serial.available()) { Serial.read(); };');
//  func.push('  return content;');
//  func.push('}');
//  var funcName = Blockly.Micropython.addFunction(
//      'getUserInputPrompt' + returnType, func.join('\n'));

//  // Only overwrite the serial set up if not present already
//  var setupCode = serialId + '.begin(9600);';
//  Blockly.Micropython.addSetup('serial_' + serialId, setupCode, false);

//  var msg = Blockly.Micropython.valueToCode(block, 'TEXT',
//      Blockly.Micropython.ORDER_NONE) || '""';
//  var code = funcName + '(' + msg + ')';

//  return [code, Blockly.Micropython.ORDER_UNARY_POSTFIX];
//};


///* ***************************************************************** *
// * The rest of the blocks have been left unimplemented, as they have *
// * been removed from the toolbox and not used for Arduino code.      *
// * ***************************************************************** */
//Blockly.Micropython['text_endString'] = function(block) {
//  return ['', Blockly.Micropython.ORDER_UNARY_POSTFIX];
//};

//Blockly.Micropython['text_indexOf'] = function(block) {
//  return ['', Blockly.Micropython.ORDER_UNARY_POSTFIX];
//};

//Blockly.Micropython['text_charAt'] = function(block) {
//  return ['', Blockly.Micropython.ORDER_UNARY_POSTFIX];
//};

//Blockly.Micropython['text_getSubstring'] = function(block) {
//  return ['', Blockly.Micropython.ORDER_UNARY_POSTFIX];
//};

//Blockly.Micropython['text_changeCase'] = function(block) {
//  return ['', Blockly.Micropython.ORDER_UNARY_POSTFIX];
//};

//Blockly.Micropython['text_prompt'] = function(block) {
//  return ['', Blockly.Micropython.ORDER_UNARY_POSTFIX];
//};
