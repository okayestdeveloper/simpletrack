module.exports = {
  "extends": [
    "react-app",
    "react-app/jest"
  ],
  "parserOptions": {
    "project": "./tsconfig.json"
  },
  "rules": {
    "array-bracket-spacing": [
      "error",
      "always",
      {
        "objectsInArrays": false,
        "arraysInArrays": false
      }
    ],
    "array-element-newline": [
      "error",
      "consistent"
    ],
    "arrow-spacing": [
      "error",
      {
        "before": true,
        "after": true
      }
    ],
    "block-spacing": "error",
    "brace-style": "error",
    "comma-dangle": [
      "error",
      "always-multiline"
    ],
    "dot-location": [
      "error",
      "property"
    ],
    "eol-last": [
      "error",
      "always"
    ],
    "eqeqeq": [
      "error",
      "always"
    ],
    "indent": [
      "error",
      2
    ],
    "implicit-arrow-linebreak": [
      "error",
      "beside"
    ],
    "jsx-a11y/alt-text": [
      "error"
    ],
    "jsx-a11y/img-redundant-alt": [
      "error"
    ],
    "jsx-a11y/aria-role": [
      "error"
    ],
    "jsx-a11y/no-access-key": [
      "error"
    ],
    "jsx-quotes": [
      "error",
      "prefer-double"
    ],
    "key-spacing": [
      "error"
    ],
    "keyword-spacing": [
      "error"
    ],
    "linebreak-style": [
      "error",
      "unix"
    ],
    "max-len": [
      "error",
      {
        "code": 120,
        "tabWidth": 2,
        "ignoreComments": true,
        "ignoreStrings": false,
        "ignoreTemplateLiterals": false
      }
    ],
    "max-nested-callbacks": [
      "error",
      5
    ],
    "max-statements-per-line": [
      "error",
      {
        "max": 1
      }
    ],
    "no-console": [
      "error",
      {
        "allow": [
          "info",
          "warn",
          "error"
        ]
      }
    ],
    "no-dupe-args": "error",
    "no-dupe-class-members": "error",
    "no-dupe-keys": "error",
    "no-duplicate-case": "error",
    "no-duplicate-imports": "error",
    "no-extra-semi": "error",
    "no-trailing-spaces": "error",
    "no-multi-spaces": "error",
    "no-multiple-empty-lines": [
      "error",
      {
        "max": 1,
        "maxEOF": 1,
        "maxBOF": 0
      }
    ],
    "no-restricted-imports": [
      "error",
      "@material-ui/core"
    ],
    "no-shadow": "off",
    "@typescript-eslint/no-shadow": ["error"],
    "no-underscore-dangle": "error",
    "no-unreachable": "error",
    "no-unused-expressions": "error",
    "object-curly-spacing": [
      "error",
      "always"
    ],
    "padded-blocks": [
      "error",
      "never",
      {
        "allowSingleLineBlocks": true
      }
    ],
    "padding-line-between-statements": [
      "error",
      {
        "blankLine": "always",
        "prev": "*",
        "next": "return"
      },
      {
        "blankLine": "always",
        "prev": "*",
        "next": "function"
      },
      {
        "blankLine": "always",
        "prev": "*",
        "next": "class"
      },
      {
        "blankLine": "always",
        "prev": "*",
        "next": "block"
      },
      {
        "blankLine": "always",
        "prev": "*",
        "next": "block-like"
      },
      {
        "blankLine": "always",
        "prev": "*",
        "next": "export"
      }
    ],
    "quotes": [
      "error",
      "single",
      {
        "avoidEscape": true,
        "allowTemplateLiterals": true
      }
    ],
    "react/prefer-stateless-function": [
      "error"
    ],
    "react/jsx-pascal-case": [
      "error",
      {
        "allowAllCaps": false
      }
    ],
    "react/jsx-closing-bracket-location": [
      "error",
      "tag-aligned"
    ],
    "react/jsx-closing-tag-location": [
      "error"
    ],
    "react/jsx-tag-spacing": [
      "error"
    ],
    "react/jsx-curly-spacing": [
      "error",
      "never",
      {
        "allowMultiline": true,
        "spacing": {
          "objectLiterals": "always"
        }
      }
    ],
    "react/jsx-boolean-value": [
      "error",
      "never"
    ],
    "react/no-string-refs": [
      "error",
      {
        "noTemplateLiterals": true
      }
    ],
    "react/jsx-wrap-multilines": [
      "error",
      {
        "declaration": "parens-new-line",
        "assignment": "parens-new-line",
        "return": "parens-new-line",
        "arrow": "parens-new-line"
      }
    ],
    "react/self-closing-comp": [
      "error"
    ],
    "react/jsx-no-bind": [
      "error"
    ],
    "react/require-render-return": [
      "error"
    ],
    "react/sort-comp": [
      1,
      {
        "order": [
          "static-methods",
          "lifecycle",
          "instance-methods",
          "getters",
          "everything-else",
          "render"
        ]
      }
    ],
    "react/no-is-mounted": [
      "error"
    ],
    "semi": [
      "error",
      "always"
    ],
    "space-before-blocks": [
      "error",
      "always"
    ],
    "space-in-parens": [
      "error",
      "never"
    ],
    "space-infix-ops": "error",
    "space-unary-ops": [
      "error",
      {
        "words": true,
        "nonwords": false
      }
    ],
    "valid-typeof": "error",
    "@typescript-eslint/consistent-type-assertions": "warn",
    "@typescript-eslint/no-empty-interface": "error",
    "@typescript-eslint/no-extra-non-null-assertion": "error",
    "@typescript-eslint/no-for-in-array": "error",
    "@typescript-eslint/no-inferrable-types": "error",
    "@typescript-eslint/no-this-alias": "error",
    "@typescript-eslint/no-unused-vars": "error",
    "@typescript-eslint/no-unnecessary-boolean-literal-compare": "error",
    "@typescript-eslint/no-unnecessary-condition": "error",
    "@typescript-eslint/no-unnecessary-type-assertion": "error",
    "@typescript-eslint/prefer-optional-chain": "warn",
    "@typescript-eslint/prefer-ts-expect-error": "warn",
    "@typescript-eslint/member-delimiter-style": [
      "error",
      {
        "singleline": {
          "delimiter": "semi",
          "requireLast": true
        }
      }
    ]
  }
}
