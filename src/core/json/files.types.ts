// Copyright © 2022 Dpm Land. All Rights Reserved.

/**
 * DpmFileInterface.
 * @description The main interface for the types in the reader!
 */
export interface DpmFileInterface {
  $schema: string;
  name: string;
  version: string;
  description: string;
  author: string;
  license: string;
  main: string;
  scripts: Record<string, string>;
  dependencies: Record<string, string>;
}

/**
 * ImportMapInterface.
 * @description The import map dependencies for the basic usage
 */
export interface ImportMapInterface {
  imports: Record<string, string>;
}

/**
 * DenoConfigurationInterface.
 * @description A JSON representation of a Deno configuration file.
 */
export interface DenoConfigurationInterface {
  $schema?: string;
  /**
   * Instructs the TypeScript compiler how to compile .ts files.
   */
  compilerOptions?: {
    /**
     * Allow JavaScript files to be a part of your program. Use the `checkJS` option to get errors from these files.
     */
    allowJs?: boolean;
    /**
     * Disable error reporting for unreachable code.
     */
    allowUnreachableCode?: boolean;
    /**
     * Disable error reporting for unused labels.
     */
    allowUnusedLabels?: boolean;
    /**
     * Enable error reporting in type-checked JavaScript files.
     */
    checkJs?: boolean;
    /**
     * Enable experimental support for TC39 stage 2 draft decorators.
     */
    experimentalDecorators?: boolean;
    /**
     * Specify what JSX code is generated.
     */
    jsx?: 'preserve' | 'react' | 'react-jsx' | 'react-jsxdev' | 'react-native';
    /**
     * Specify the JSX factory function used when targeting React JSX emit, e.g. 'React.createElement' or 'h'
     */
    jsxFactory?: string;
    /**
     * Specify the JSX Fragment reference used for fragments when targeting React JSX emit e.g. 'React.Fragment' or 'Fragment'.
     */
    jsxFragmentFactory?: string;
    /**
     * Specify module specifier used to import the JSX factory functions when using jsx: 'react-jsx*'.
     */
    jsxImportSource?: string;
    /**
     * Make keyof only return strings instead of string, numbers or symbols. Legacy option.
     */
    keyofStringsOnly?: boolean;
    /**
     * Specify a set of bundled library declaration files that describe the target runtime environment.
     */
    lib?: string[];
    /**
     * Enable error reporting for fallthrough cases in switch statements.
     */
    noFallthroughCasesInSwitch?: boolean;
    /**
     * Enable error reporting for expressions and declarations with an implied `any` type..
     */
    noImplicitAny?: boolean;
    /**
     * Ensure overriding members in derived classes are marked with an override modifier.
     */
    noImplicitOverride?: boolean;
    /**
     * Enable error reporting for codepaths that do not explicitly return in a function.
     */
    noImplicitReturns?: boolean;
    /**
     * Enable error reporting when `this` is given the type `any`.
     */
    noImplicitThis?: boolean;
    /**
     * Disable adding 'use strict' directives in emitted JavaScript files.
     */
    noImplicitUseStrict?: boolean;
    /**
     * Disable strict checking of generic signatures in function types.
     */
    noStrictGenericChecks?: boolean;
    /**
     * Enable error reporting when a local variables aren't read.
     */
    noUnusedLocals?: boolean;
    /**
     * Raise an error when a function parameter isn't read
     */
    noUnusedParameters?: boolean;
    /**
     * Add `undefined` to a type when accessed using an index.
     */
    noUncheckedIndexedAccess?: boolean;
    /**
     * Enable all strict type checking options.
     */
    strict?: boolean;
    /**
     * Check that the arguments for `bind`, `call`, and `apply` methods match the original function.
     */
    strictBindCallApply?: boolean;
    /**
     * When assigning functions, check to ensure parameters and the return values are subtype-compatible.
     */
    strictFunctionTypes?: boolean;
    /**
     * Check for class properties that are declared but not set in the constructor.
     */
    strictPropertyInitialization?: boolean;
    /**
     * When type checking, take into account `null` and `undefined`.
     */
    strictNullChecks?: boolean;
    /**
     * Disable reporting of excess property errors during the creation of object literals.
     */
    suppressExcessPropertyErrors?: boolean;
    /**
     * Suppress `noImplicitAny` errors when indexing objects that lack index signatures.
     */
    suppressImplicitAnyIndexErrors?: boolean;
  };
  /**
   * The location of an import map to be used when resolving modules. If an import map is explicitly specified, it will override this value.
   */
  importMap?: string;
  /**
   * Configuration for linter
   */
  lint?: {
    files?: {
      /**
       * List of files or directories that will be linted.
       */
      include?: string[];
      /**
       * List of files or directories that will not be linted.
       */
      exclude?: string[];
    };
    rules?: {
      /**
       * List of tag names that will be run. Empty list disables all tags and will only use rules from `include`.
       */
      tags?: string[];
      /**
       * List of rule names that will be excluded from configured tag sets. If the same rule is in `include` it be run.
       */
      exclude?: string[];
      /**
       * List of rule names that will be run. Even if the same rule is in `exclude` it will be run.
       */
      include?: string[];
    };
  };
  /**
   * Configuration for formatter
   */
  fmt?: {
    files?: {
      /**
       * List of files or directories that will be formatted.
       */
      include?: string[];
      /**
       * List of files or directories that will not be formatted.
       */
      exclude?: string[];
    };
    options?: {
      /**
       * Whether to use tabs (true) or spaces (false) for indentation.
       */
      useTabs?: boolean;
      /**
       * The width of a line the printer will try to stay under. Note that the printer may exceed this width in certain cases.
       */
      lineWidth?: number;
      /**
       * The number of characters for an indent.
       */
      indentWidth?: number;
      /**
       * Whether to use single quote (true) or double quote (false) for quotation.
       */
      singleQuote?: boolean;
      /**
       * Define how prose should be wrapped in Markdown files.
       */
      proseWrap?: 'always' | 'never' | 'preserve';
      [k: string]: unknown;
    };
  };
  /**
   * Configuration for deno task
   */
  tasks?: Record<string, string>;
  /**
   * Configuration for deno test
   */
  test?: {
    files?: {
      /**
       * List of files or directories that will be searched for tests.
       */
      include?: string[];
      /**
       * List of files or directories that will not be searched for tests.
       */
      exclude?: string[];
    };
  };
}

/**
 * EggsConfigInterface.
 * @description The Eggs Cli Config File
 */
export interface EggsConfigInterface {
  $schema?: string;
  /**
   * The name of your module/repository.
   */
  name?: string;
  /**
   * Your module/repository description.
   */
  description?: string;
  /**
   * Current version of your module. Must follow semver.
   */
  version?: string;
  /**
   * Increment the version by release type. See https://docs.nest.land/eggs/configuration.html#field-information.
   */
  bump?: string;
  /*
  * The home page or repo for the nest registry
  */
  homepage?: string;
  /*
   *
   */
  releaseType?:
    | 'patch'
    | 'minor'
    | 'major'
    | 'pre'
    | 'prepatch'
    | 'preminor'
    | 'premajor'
    | 'prerelease';
  /**
   * The index file of your project. This is what users will see when they try to import your module from our registry! Defaults to ./mod.ts.
   */
  entry?: string;
  /**
   * Is this version unstable?. Default value is determined by Semantic Versioning rules.
   */
  unstable?: boolean;
  /**
   * Should people be able to find this module/version on the gallery?. Defaults to false.
   */
  unlisted?: boolean;
  /**
   * A link to your repository. Defaults to null.
   */
  repository?: string;
  /**
   * All the files that should be uploaded to nest.land. Supports file globbing. Do not use ./** /* for the files field! This has been known to cause errors in the publishing process.
   */
  files?: string[];
  /**
   * All the files that should be ignored when uploading to nest.land. Supports file globbing.
   */
  ignore?: string[];
  /**
   * Automatically format your code before publishing to the blockchain. Defaults to false
   */
  checkFormat?: boolean | string;
  /**
   * Run deno test. Defaults to false.
   */
  checkTests?: boolean | string;
  /**
   * Simulates a dummy installation and check for missing files in the dependency tree. Defaults to false.
   */
  checkInstallation?: boolean;
  /**
   * Performs all checks. Defaults to true.
   */
  checkAll?: boolean;
}