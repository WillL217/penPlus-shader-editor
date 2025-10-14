penPlus.setupMonacoTheme = () => {
  monaco.languages.register({ id: "glsl" });
  const mainTypes = [
    [/\/\/.*/, "comment"],
    [/\/\*/, 'comment', '@comment'],
    [/float\b/, "variable"],
    [/int\b/, "int"],

    [/vec2\b/, "vec-two"],
    [/vec3\b/, "vec-three"],
    [/vec4\b/, "vec-four"],

    [/mat2\b/, "matrix"],
    [/mat3\b/, "matrix"],
    [/mat4\b/, "matrix"],

    [/lowp\b/, "precision"],
    [/mediump\b/, "precision"],
    [/highp\b/, "precision"],
    
    [/\d+\.\d+/, "operator"],
    [/\d+\./, "operator"],
    [/\.\d+/, "operator"],
    [/\d+/, "operator"],
  ];
  const inFunctions = [
    ...mainTypes,
    [/\{/, "controls", "@controls"],

    [/>=/, "operator"],
    [/<=/, "operator"],
    [/>>/, "operator"],
    [/<</, "operator"],
    [/</, "operator"],
    [/>/, "operator"],
    [/==/, "operator"],
    [/\!=/, "operator"],
    [/=/, "operator"],

    [/\+=/, "operator"],
    [/\/=/, "operator"],
    [/\-=/, "operator"],
    [/\*=/, "operator"],

    [/\//, "operator"],
    [/\*/, "operator"],
    [/\+/, "operator"],
    [/\-/, "operator"],

    [/\|/, "operator"],
    [/\&/, "operator"],
    [/\^/, "operator"],

    [/return\b/, "my-blocks"],
    [/discard\b/, "my-blocks"],
    [/if\b/, "controls"],
    [/else\b/, "controls"],
    [/switch\b/, "controls"],
    [/case\b/, "controls"],
    [/for\b/, "controls"],
    [/while\b/, "controls"],
    [/do\b/, "controls"],
    [/break\b/, "controls"],
    [/continue\b/, "controls"],
    [/\w* *\(/, "my-blocks"],
    [/\w+/], // prevent words with types in them from being detected
    [/\)/, "my-blocks"],
  ]
  monaco.languages.setLanguageConfiguration("glsl", {
    autoClosingPairs: [
      { open: '{', close: '}' },
      { open: '[', close: ']' },
      { open: '(', close: ')' },
    ],
    folding: {
      markers: {
        start: /{/,
        end: /}/
      }
    }
  })
  monaco.languages.setMonarchTokensProvider("glsl", {
    tokenizer: {
      root: [
        
        [/layout.*\(.*location.*=.*\d\)/,"operator"],
        ...mainTypes,

        [/sampler2D/, "texture"],
        [/sampler3D/, "texture3d"],
        [/samplerCube/, "cubemap"],

        [/true/, "operator"],
        [/false/, "operator"],

        [/varying/, "precision"],
        [/attribute/, "precision"],
        [/uniform/, "precision"],


        [/[\w_]*\s*\(/, "my-blocks"],
        [/\)/, "my-blocks"],
        [/void/, "my-blocks"],
        [/struct/, "struct", "@struct"],
        [/\w+/], // prevent words with types in them from being detected
        [/{/,"my-blocks", "@myblock"],
      ],
      struct: [
        ...mainTypes,
        [/\w+/], // prevent words with types in them from being detected

        [/{/, 'struct'],
        [/}/, 'struct', '@pop'],
      ],
      myblock: [
        [/}/, 'my-blocks', '@pop'],
        ...inFunctions,
      ],
      controls: [
        [/}/, 'controls', '@pop'],
        ...inFunctions,
      ]
      ,
      comment: [
        [/[^\/*]+/, 'comment'],
        ['\\*/', 'comment', '@pop'],
        [/[\/*]/, 'comment']
      ],
    },
  });

  penPlus.updateMonacoTheme = () => {
    // Define a new theme that contains only rules that match this language
    monaco.editor.defineTheme("myCoolTheme", {
      base: `vs${penPlus.editorTheme == "dark" ? "-dark" : ""}`,
      inherit: true,
      rules: [
        {
          token: "my-blocks",
          foreground: penPlus.penPlusTheme.blockStyles["myblocks_blocks"].colourPrimary,
          fontStyle: "bold",
        },

        {
          token: "variable",
          foreground: penPlus.penPlusTheme.blockStyles["variables_blocks"].colourPrimary,
        },
        
        {
          token: "int",
          foreground: penPlus.penPlusTheme.blockStyles["int_blocks"].colourPrimary,
        },

        {
          token: "vec-two",
          foreground: penPlus.penPlusTheme.blockStyles["vector_blocks"].colourPrimary,
        },
        {
          token: "vec-three",
          foreground: penPlus.penPlusTheme.blockStyles["vec3_blocks"].colourPrimary,
        },
        {
          token: "vec-four",
          foreground: penPlus.penPlusTheme.blockStyles["vec4_blocks"].colourPrimary,
        },

        {
          token: "matrix",
          foreground: penPlus.penPlusTheme.blockStyles["matrix_blocks"].colourPrimary,
        },

        {
          token: "texture",
          foreground: penPlus.penPlusTheme.blockStyles["texture_blocks"].colourPrimary,
        },
        {
          token: "texture3d",
          foreground: penPlus.penPlusTheme.blockStyles["texture3d_blocks"].colourPrimary,
        },
        {
          token: "cubemap",
          foreground: penPlus.penPlusTheme.blockStyles["cubemap_blocks"].colourPrimary,
        },

        {
          token: "controls",
          foreground: penPlus.penPlusTheme.blockStyles["controls_blocks"].colourPrimary,
          fontStyle: "bold",
        },

        {
          token: "comment",
          foreground: penPlus.penPlusTheme.blockStyles["sensing_blocks"].colourPrimary,
          fontStyle: "italic",
        },

        {
          token: "operator",
          foreground: penPlus.penPlusTheme.blockStyles["operators_blocks"].colourPrimary,
        },

        {
          token: "precision",
          foreground: penPlus.penPlusTheme.blockStyles["colors_blocks"].colourPrimary,
        },

        {
          token: "struct",
          foreground: penPlus.experimental?penPlus.penPlusTheme.blockStyles["structs_blocks"].colourPrimary:'#ffffff',
        },
      ],
      colors: {
        "editor.foreground": penPlus.editorTheme == "dark" ? "#efefef" : "#1f1f1f",
      },
    });
  }
  
  penPlus.updateMonacoTheme();
};
