module.exports = (function(){
  /*
   * Generated by PEG.js 0.7.0.
   *
   * http://pegjs.majda.cz/
   */
  
  function subclass(child, parent) {
    function ctor() { this.constructor = child; }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor();
  }
  
  function quote(s) {
    /*
     * ECMA-262, 5th ed., 7.8.4: All characters may appear literally in a
     * string literal except for the closing quote character, backslash,
     * carriage return, line separator, paragraph separator, and line feed.
     * Any character may appear in the form of an escape sequence.
     *
     * For portability, we also escape escape all control and non-ASCII
     * characters. Note that "\0" and "\v" escape sequences are not used
     * because JSHint does not like the first and IE the second.
     */
     return '"' + s
      .replace(/\\/g, '\\\\')  // backslash
      .replace(/"/g, '\\"')    // closing quote character
      .replace(/\x08/g, '\\b') // backspace
      .replace(/\t/g, '\\t')   // horizontal tab
      .replace(/\n/g, '\\n')   // line feed
      .replace(/\f/g, '\\f')   // form feed
      .replace(/\r/g, '\\r')   // carriage return
      .replace(/[\x00-\x07\x0B\x0E-\x1F\x80-\uFFFF]/g, escape)
      + '"';
  }
  
  var result = {
    /*
     * Parses the input with a generated parser. If the parsing is successful,
     * returns a value explicitly or implicitly specified by the grammar from
     * which the parser was generated (see |PEG.buildParser|). If the parsing is
     * unsuccessful, throws |PEG.parser.SyntaxError| describing the error.
     */
    parse: function(input) {
      var parseFunctions = {
        "start": parse_start
      };
      
      var options = arguments.length > 1 ? arguments[1] : {},
          startRule;
      
      if (options.startRule !== undefined) {
        startRule = options.startRule;
        
        if (parseFunctions[startRule] === undefined) {
          throw new Error("Can't start parsing from rule " + quote(startRule) + ".");
        }
      } else {
        startRule = "start";
      }
      
      var pos = 0;
      var reportedPos = 0;
      var cachedReportedPos = 0;
      var cachedReportedPosDetails = { line: 1, column: 1, seenCR: false };
      var reportFailures = 0;
      var rightmostFailuresPos = 0;
      var rightmostFailuresExpected = [];
      
      function padLeft(input, padding, length) {
        var result = input;
        
        var padLength = length - input.length;
        for (var i = 0; i < padLength; i++) {
          result = padding + result;
        }
        
        return result;
      }
      
      function escape(ch) {
        var charCode = ch.charCodeAt(0);
        var escapeChar;
        var length;
        
        if (charCode <= 0xFF) {
          escapeChar = 'x';
          length = 2;
        } else {
          escapeChar = 'u';
          length = 4;
        }
        
        return '\\' + escapeChar + padLeft(charCode.toString(16).toUpperCase(), '0', length);
      }
      
      function computeReportedPosDetails() {
        function advanceCachedReportedPos() {
          var ch;
          
          for (; cachedReportedPos < reportedPos; cachedReportedPos++) {
            ch = input.charAt(cachedReportedPos);
            if (ch === "\n") {
              if (!cachedReportedPosDetails.seenCR) { cachedReportedPosDetails.line++; }
              cachedReportedPosDetails.column = 1;
              cachedReportedPosDetails.seenCR = false;
            } else if (ch === "\r" || ch === "\u2028" || ch === "\u2029") {
              cachedReportedPosDetails.line++;
              cachedReportedPosDetails.column = 1;
              cachedReportedPosDetails.seenCR = true;
            } else {
              cachedReportedPosDetails.column++;
              cachedReportedPosDetails.seenCR = false;
            }
          }
        }
        
        if (cachedReportedPos !== reportedPos) {
          if (cachedReportedPos > reportedPos) {
            cachedReportedPos = 0;
            cachedReportedPosDetails = { line: 1, column: 1, seenCR: false };
          }
          advanceCachedReportedPos();
        }
        
        return cachedReportedPosDetails;
      }
      
      function text() {
        return input.substring(reportedPos, pos);
      }
      
      function offset() {
        return reportedPos;
      }
      
      function line() {
        return computeReportedPosDetails().line;
      }
      
      function column() {
        return computeReportedPosDetails().column;
      }
      
      function matchFailed(failure) {
        if (pos < rightmostFailuresPos) {
          return;
        }
        
        if (pos > rightmostFailuresPos) {
          rightmostFailuresPos = pos;
          rightmostFailuresExpected = [];
        }
        
        rightmostFailuresExpected.push(failure);
      }
      
      function parse_start() {
        var r0, r1, r2, r3, r4;
        
        r1 = pos;
        r2 = pos;
        r3 = parse_INDENT();
        r3 = r3 !== null ? r3 : "";
        if (r3 !== null) {
          r4 = parse_line();
          if (r4 !== null) {
            r0 = [r3, r4];
          } else {
            r0 = null;
            pos = r2;
          }
        } else {
          r0 = null;
          pos = r2;
        }
        if (r0 !== null) {
          reportedPos = r1;
          r0 = (function(l) { return l; })(r4);
        }
        if (r0 === null) {
          pos = r1;
        }
        return r0;
      }
      
      function parse_line() {
        var r0, r1, r2, r3, r4, r5, r6, r7, r8, r9, r10, r11;
        
        r1 = pos;
        r2 = pos;
        r3 = parse_SAMEDENT();
        if (r3 !== null) {
          r6 = pos;
          r7 = pos;
          r9 = pos;
          reportFailures++;
          r8 = parse_EOL();
          reportFailures--;
          if (r8 === null) {
            r8 = "";
          } else {
            r8 = null;
            pos = r9;
          }
          if (r8 !== null) {
            if (input.length > pos) {
              r9 = input.charAt(pos);
              pos++;
            } else {
              r9 = null;
              if (reportFailures === 0) {
                matchFailed("any character");
              }
            }
            if (r9 !== null) {
              r5 = [r8, r9];
            } else {
              r5 = null;
              pos = r7;
            }
          } else {
            r5 = null;
            pos = r7;
          }
          if (r5 !== null) {
            reportedPos = r6;
            r5 = (function(c) { return c; })(r9);
          }
          if (r5 === null) {
            pos = r6;
          }
          if (r5 !== null) {
            r4 = [];
            while (r5 !== null) {
              r4.push(r5);
              r6 = pos;
              r7 = pos;
              r9 = pos;
              reportFailures++;
              r8 = parse_EOL();
              reportFailures--;
              if (r8 === null) {
                r8 = "";
              } else {
                r8 = null;
                pos = r9;
              }
              if (r8 !== null) {
                if (input.length > pos) {
                  r9 = input.charAt(pos);
                  pos++;
                } else {
                  r9 = null;
                  if (reportFailures === 0) {
                    matchFailed("any character");
                  }
                }
                if (r9 !== null) {
                  r5 = [r8, r9];
                } else {
                  r5 = null;
                  pos = r7;
                }
              } else {
                r5 = null;
                pos = r7;
              }
              if (r5 !== null) {
                reportedPos = r6;
                r5 = (function(c) { return c; })(r9);
              }
              if (r5 === null) {
                pos = r6;
              }
            }
          } else {
            r4 = null;
          }
          if (r4 !== null) {
            r5 = parse_EOL();
            r5 = r5 !== null ? r5 : "";
            if (r5 !== null) {
              r7 = pos;
              r8 = pos;
              r9 = parse_INDENT();
              if (r9 !== null) {
                r10 = [];
                r11 = parse_line();
                while (r11 !== null) {
                  r10.push(r11);
                  r11 = parse_line();
                }
                if (r10 !== null) {
                  r11 = parse_DEDENT();
                  if (r11 !== null) {
                    r6 = [r9, r10, r11];
                  } else {
                    r6 = null;
                    pos = r8;
                  }
                } else {
                  r6 = null;
                  pos = r8;
                }
              } else {
                r6 = null;
                pos = r8;
              }
              if (r6 !== null) {
                reportedPos = r7;
                r6 = (function(c) { return c; })(r10);
              }
              if (r6 === null) {
                pos = r7;
              }
              r6 = r6 !== null ? r6 : "";
              if (r6 !== null) {
                r0 = [r3, r4, r5, r6];
              } else {
                r0 = null;
                pos = r2;
              }
            } else {
              r0 = null;
              pos = r2;
            }
          } else {
            r0 = null;
            pos = r2;
          }
        } else {
          r0 = null;
          pos = r2;
        }
        if (r0 !== null) {
          reportedPos = r1;
          r0 = (function(line, children) { var o = {}; o[line] = children; return children ? o : line.join(""); })(r4, r6);
        }
        if (r0 === null) {
          pos = r1;
        }
        return r0;
      }
      
      function parse_EOL() {
        var r0;
        
        if (input.substr(pos, 2) === "\r\n") {
          r0 = "\r\n";
          pos += 2;
        } else {
          r0 = null;
          if (reportFailures === 0) {
            matchFailed("\"\\r\\n\"");
          }
        }
        if (r0 === null) {
          if (input.charCodeAt(pos) === 10) {
            r0 = "\n";
            pos++;
          } else {
            r0 = null;
            if (reportFailures === 0) {
              matchFailed("\"\\n\"");
            }
          }
          if (r0 === null) {
            if (input.charCodeAt(pos) === 13) {
              r0 = "\r";
              pos++;
            } else {
              r0 = null;
              if (reportFailures === 0) {
                matchFailed("\"\\r\"");
              }
            }
          }
        }
        return r0;
      }
      
      function parse_SAMEDENT() {
        var r0, r1, r2, r3;
        
        r1 = pos;
        r2 = [];
        if (/^[ \t]/.test(input.charAt(pos))) {
          r3 = input.charAt(pos);
          pos++;
        } else {
          r3 = null;
          if (reportFailures === 0) {
            matchFailed("[ \\t]");
          }
        }
        while (r3 !== null) {
          r2.push(r3);
          if (/^[ \t]/.test(input.charAt(pos))) {
            r3 = input.charAt(pos);
            pos++;
          } else {
            r3 = null;
            if (reportFailures === 0) {
              matchFailed("[ \\t]");
            }
          }
        }
        if (r2 !== null) {
          reportedPos = pos;
          r3 = (function(i) { return i.join("") === indent; })(r2) ? "" : null;
          if (r3 !== null) {
            r0 = [r2, r3];
          } else {
            r0 = null;
            pos = r1;
          }
        } else {
          r0 = null;
          pos = r1;
        }
        return r0;
      }
      
      function parse_INDENT() {
        var r0, r1, r2, r3, r4;
        
        r1 = pos;
        r2 = pos;
        if (/^[ \t]/.test(input.charAt(pos))) {
          r4 = input.charAt(pos);
          pos++;
        } else {
          r4 = null;
          if (reportFailures === 0) {
            matchFailed("[ \\t]");
          }
        }
        if (r4 !== null) {
          r3 = [];
          while (r4 !== null) {
            r3.push(r4);
            if (/^[ \t]/.test(input.charAt(pos))) {
              r4 = input.charAt(pos);
              pos++;
            } else {
              r4 = null;
              if (reportFailures === 0) {
                matchFailed("[ \\t]");
              }
            }
          }
        } else {
          r3 = null;
        }
        if (r3 !== null) {
          reportedPos = pos;
          r4 = (function(i) { return i.length > indent.length; })(r3) ? "" : null;
          if (r4 !== null) {
            r0 = [r3, r4];
          } else {
            r0 = null;
            pos = r2;
          }
        } else {
          r0 = null;
          pos = r2;
        }
        if (r0 !== null) {
          reportedPos = r1;
          r0 = (function(i) { indentStack.push(indent); indent = i.join(""); pos = offset; })(r3);
        }
        if (r0 === null) {
          pos = r1;
        }
        return r0;
      }
      
      function parse_DEDENT() {
        var r0, r1, r2;
        
        r1 = pos;
        r2 = pos;
        r0 = [];
        if (r0 !== null) {
          reportedPos = r1;
          r0 = (function() { indent = indentStack.pop(); })();
        }
        if (r0 === null) {
          pos = r1;
        }
        return r0;
      }
      
      
      function cleanupExpected(expected) {
        expected.sort();
        
        var lastExpected = null;
        var cleanExpected = [];
        for (var i = 0; i < expected.length; i++) {
          if (expected[i] !== lastExpected) {
            cleanExpected.push(expected[i]);
            lastExpected = expected[i];
          }
        }
        return cleanExpected;
      }
      
       var indentStack = [], indent = ""; 
      
      var result = parseFunctions[startRule]();
      
      /*
       * The parser is now in one of the following three states:
       *
       * 1. The parser successfully parsed the whole input.
       *
       *    - |result !== null|
       *    - |pos === input.length|
       *    - |rightmostFailuresExpected| may or may not contain something
       *
       * 2. The parser successfully parsed only a part of the input.
       *
       *    - |result !== null|
       *    - |pos < input.length|
       *    - |rightmostFailuresExpected| may or may not contain something
       *
       * 3. The parser did not successfully parse any part of the input.
       *
       *   - |result === null|
       *   - |pos === 0|
       *   - |rightmostFailuresExpected| contains at least one failure
       *
       * All code following this comment (including called functions) must
       * handle these states.
       */
      if (result === null || pos !== input.length) {
        reportedPos = Math.max(pos, rightmostFailuresPos);
        var found = reportedPos < input.length ? input.charAt(reportedPos) : null;
        var reportedPosDetails = computeReportedPosDetails();
        
        throw new this.SyntaxError(
          cleanupExpected(rightmostFailuresExpected),
          found,
          reportedPos,
          reportedPosDetails.line,
          reportedPosDetails.column
        );
      }
      
      return result;
    }
  };
  
  /* Thrown when a parser encounters a syntax error. */
  
  result.SyntaxError = function(expected, found, offset, line, column) {
    function buildMessage(expected, found) {
      var expectedHumanized, foundHumanized;
      
      switch (expected.length) {
        case 0:
          expectedHumanized = "end of input";
          break;
        case 1:
          expectedHumanized = expected[0];
          break;
        default:
          expectedHumanized = expected.slice(0, expected.length - 1).join(", ")
            + " or "
            + expected[expected.length - 1];
      }
      
      foundHumanized = found ? quote(found) : "end of input";
      
      return "Expected " + expectedHumanized + " but " + foundHumanized + " found.";
    }
    
    this.name = "SyntaxError";
    this.expected = expected;
    this.found = found;
    this.message = buildMessage(expected, found);
    this.offset = offset;
    this.line = line;
    this.column = column;
  };
  
  subclass(result.SyntaxError, Error);
  
  return result;
})();