import uniHelper from '@uni-helper/eslint-config'

export default uniHelper({
  unocss: true,
  vue: true,
  markdown: false,
  ignores: [
    // 忽略uni_modules目录
    '**/uni_modules/',
    // 忽略原生插件目录
    '**/nativeplugins/',
    'dist',
    // unplugin-auto-import 生成的类型文件，每次提交都改变，所以加入这里吧，与 .gitignore 配合使用
    'auto-import.d.ts',
    // vite-plugin-uni-pages 生成的类型文件，每次切换分支都一堆不同的，所以直接 .gitignore
    'uni-pages.d.ts',
    // 插件生成的文件
    'src/pages.json',
    'src/manifest.json',
    // 忽略自动生成文件
    'src/service/**',
  ],
  // https://eslint-config.antfu.me/rules
  rules: {
    'no-useless-return': 'off',
    'no-console': 'off',
    'no-unused-vars': 'off',
    'vue/no-unused-refs': 'off',
    'unused-imports/no-unused-vars': 'off',
    'eslint-comments/no-unlimited-disable': 'off',
    'jsdoc/check-param-names': 'off',
    'jsdoc/require-returns-description': 'off',
    'ts/no-empty-object-type': 'off',
    'no-extend-native': 'off',
    'vue/singleline-html-element-content-newline': [
      'error',
      {
        externalIgnores: ['text'],
      },
    ],
    // vue SFC 调换顺序改这里
    'vue/block-order': ['error', {
      order: [['script', 'template'], 'style'],
    }],
    // 允许使用双引号或单引号
    'style/quotes': 'off',
    'quotes': 'off',
    '@stylistic/quotes': 'off',
    // 允许使用分号
    'style/semi': 'off',
    'semi': 'off',
    '@stylistic/semi': 'off',
    // 箭头函数参数括号规则：允许省略单个参数的括号
    'style/arrow-parens': 'off',
    'arrow-parens': 'off',
    '@stylistic/arrow-parens': 'off',
    // 操作符换行规则：允许放在行尾或行首
    'style/operator-linebreak': 'off',
    'operator-linebreak': 'off',
    '@stylistic/operator-linebreak': 'off',
    // 禁用所有 stylic 规则
    '@stylistic/semi-spacing': 'off',
    '@stylistic/quote-props': 'off',
    // 禁用缩进检查
    'vue/html-indent': 'off',
    'indent': 'off',
    '@stylistic/indent': 'off',
    // 禁用 brace-style 规则（允许 if 后不换行，else 与 } 同行）
    'brace-style': 'off',
    '@stylistic/brace-style': 'off',
    // 禁用 curly 规则（允许单行 if 不写花括号）
    'curly': 'off',
    // 禁用 antfu/if-newline 规则
    'antfu/if-newline': 'off',
    // 禁用 member-delimiter-style 规则（允许接口使用分号或逗号）
    '@stylistic/member-delimiter-style': 'off',
    'style/member-delimiter-style': 'off',
  },
  formatters: {
    /**
     * Format CSS, LESS, SCSS files, also the `<style>` blocks in Vue
     * By default uses Prettier
     */
    css: true,
    /**
     * Format HTML files
     * By default uses Prettier
     */
    html: true,
  },
})
