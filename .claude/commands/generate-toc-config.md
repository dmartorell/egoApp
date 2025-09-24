---
argument-hint: <folder_path> <description>
description: Generate ToC configuration from PDF index screenshots for journalism style guide extraction pipeline
allowed-tools: Read, Write, Glob, MultiEdit
---

# Generate Table of Contents Configuration

Intelligently generate TypeScript configuration files for journalism style guide extraction by analyzing PDF index screenshots with AI-powered image recognition.

**Arguments**:
- `$1` (folder_path): Path to folder containing PDF index screenshots
- `$2` (description): Detailed description of index structure and extraction preferences

**What this command does**:
- Analyzes multiple PDF index screenshots to extract hierarchical document structure
- Generates prioritized section configurations based on journalism importance
- Creates proper TypeScript configuration files with complete type safety
- Integrates seamlessly with the existing ToC-guided extraction pipeline
- Applies intelligent priority scoring for style rules, grammar, and attribution sections
- Handles complex numbering systems (Roman numerals, Arabic numbers, alphabetic)
- Filters sections based on user specifications and journalism relevance

**Example usage**:
```
/generate-toc-config packages/backend/assets/ELPAIS_index "Focus on grammar and style rules, skip photo sections"
```

## Usage

```
/generate-toc-config packages/backend/assets/AP_STYLEBOOK_index "The index uses Roman numerals for main sections (I, II, III, etc.) and Arabic numbers for subsections. Skip sections about photos and graphics. Focus on grammar, style, and attribution rules."
```

## Arguments

1. **folder_path** (required): Path to folder containing index screenshots
   - Should contain .jpg, .jpeg, or .png files
   - Example: `packages/backend/assets/ELPAIS_index`

2. **description** (required): Detailed description of the index structure
   - Explain numbering systems (Roman numerals, Arabic numbers, alphabetic)
   - Specify sections to exclude/include
   - Mention focus areas and priorities
   - Describe any special formatting or conventions

## Implementation Steps

### Phase 1: Setup and Validation

1. **Parse Arguments**
   ```typescript
   const folderPath = args[0];
   const description = args[1];

   if (!folderPath || !description) {
     throw new Error('Both folder_path and description are required');
   }
   ```

2. **Validate Input**
   - Check if folder path exists
   - Verify folder contains image files
   - Extract document ID from folder name
   - Parse description for key instructions

3. **Initialize Processing**
   - Create document ID from folder name (e.g., "ELPAIS_index" → "el-pais")
   - Set up logging and progress tracking
   - Prepare output file path

### Phase 2: Image Analysis

1. **Read Screenshots**
   ```markdown
   For each image in the folder:
   - Use Read tool to load the image
   - Analyze with Claude's vision capabilities
   - Extract structural information
   ```

2. **Extract Structure Information**
   ```markdown
   From each image, identify:
   - Section titles and hierarchical levels
   - Page numbers and ranges
   - Numbering systems used
   - Subsection relationships
   - Any special formatting
   ```

3. **Consolidate Analysis**
   ```markdown
   Combine results from all images:
   - Build complete hierarchical structure
   - Resolve page range boundaries
   - Identify section relationships
   - Apply user exclusion rules
   ```

### Phase 3: Configuration Generation

1. **Map to ToCConfiguration Interface**
   ```typescript
   interface ToCConfiguration {
     documentId: string;
     name: string;
     sections: ToCSection[];
     skipSections?: string[];
     extractionOptions?: {
       minWords?: number;
       maxWords?: number;
       confidenceThreshold?: number;
       textType?: string;
     };
   }
   ```

2. **Generate Section IDs**
   ```markdown
   Create consistent section IDs based on structure:
   - Roman numerals → "TITULO_I", "TITULO_II", etc.
   - Arabic numbers → "CHAPTER_1", "CHAPTER_2", etc.
   - Alphabetic → "SECTION_A", "SECTION_B", etc.
   - Custom patterns based on document type
   ```

3. **Assign Priorities**
   ```markdown
   Intelligent priority assignment (1-10):
   - Grammar/Style sections: 9-10 (highest)
   - Attribution/Ethics: 9-10
   - Structure/Format: 8-9
   - Technical details: 6-8
   - Photos/Graphics: 5-7 (or skip if requested)
   ```

4. **Set Focus Areas**
   ```markdown
   Based on section content, assign relevant focus areas:
   - Grammar sections: ['gramática', 'errores', 'concordancia']
   - Style sections: ['estilo', 'redacción', 'claridad']
   - Attribution: ['fuentes', 'citas', 'atribución']
   - Numbers: ['números', 'fechas', 'estadísticas']
   ```

### Phase 4: File Creation

1. **Generate TypeScript Configuration**
   ```typescript
   // Template for generated config file
   import type { ToCConfiguration } from '../../types/tocConfig';

   /**
    * Table of Contents configuration for {Document Name}
    * Generated automatically from index screenshots on {date}
    *
    * Source folder: {folder_path}
    * User description: {description}
    *
    * Generated sections: {section_count}
    * Excluded sections: {excluded_sections}
    */
   export const {documentId}ToCConfig: ToCConfiguration = {
     documentId: '{document-id}',
     name: '{Document Name}',

     extractionOptions: {
       minWords: 30,
       maxWords: 8000,
       confidenceThreshold: 0.6,
       textType: 'news', // or based on document type
     },

     skipSections: [/* Generated from user description */],

     sections: [
       // Generated sections with full structure
     ],
   };
   ```

2. **Update Integration Script**
   ```typescript
   // Add to extract-toc-guided.ts
   import { {documentId}ToCConfig } from '../../src/config/toc/{document-id}-toc.config';

   const availableConfigs: Record<string, ToCConfiguration> = {
     'el-pais': elPaisToCConfig,
     '{document-id}': {documentId}ToCConfig, // New config
   };
   ```

3. **Validate Generated Files**
   ```markdown
   - Check TypeScript compilation
   - Validate against ToCConfiguration interface
   - Verify all page ranges are logical
   - Ensure section IDs are unique
   ```

## Advanced Features

### Intelligent Structure Recognition

```markdown
Handle complex hierarchical structures:

1. **Multi-level Nesting**
   - Detect indentation patterns
   - Identify parent-child relationships
   - Handle variable depth (2-5 levels)

2. **Page Range Calculation**
   - Automatic boundary detection
   - Handle single pages vs ranges
   - Resolve overlapping sections

3. **Cross-Reference Resolution**
   - Link section titles to page numbers
   - Handle continued sections
   - Resolve "see also" references
```

### Smart Priority System

```markdown
Priority assignment logic:

**Priority 10 (Critical):**
- Grammar fundamentals
- Core style rules
- Attribution standards
- Lead writing guidelines

**Priority 9 (High):**
- Punctuation rules
- Headline standards
- Source handling
- Text structure

**Priority 8 (Medium-High):**
- Numbers and dates
- Names and titles
- Typography rules
- Interview guidelines

**Priority 7 (Medium):**
- Protocol rules
- Specific formatting
- Technical conventions
- Regional variations

**Priority 6 and below:**
- Reference materials
- Appendices
- Photo guidelines (if not excluded)
- Administrative content
```

### Error Handling

```markdown
Comprehensive error handling:

1. **Image Analysis Failures**
   - Retry with different parameters
   - Request user clarification
   - Skip problematic images with warning

2. **Structure Ambiguity**
   - Present multiple interpretations
   - Ask for user confirmation
   - Use conservative defaults

3. **File System Issues**
   - Check permissions before writing
   - Create backup of existing files
   - Rollback on partial failures

4. **Type Validation Errors**
   - Validate against TypeScript interfaces
   - Fix common formatting issues
   - Report unfixable problems clearly
```

## Workflow Process

```markdown
1. **Input Validation Phase**
   ✓ Validate folder path and contents
   ✓ Parse user description for key instructions
   ✓ Extract document ID and prepare output paths

2. **Image Analysis Phase**
   ✓ Read all image files from specified folder
   ✓ Analyze each image for structure and content
   ✓ Extract hierarchical information and page ranges

3. **Structure Processing Phase**
   ✓ Consolidate analysis results
   ✓ Apply user exclusion rules
   ✓ Generate section IDs and assign priorities

4. **Configuration Generation Phase**
   ✓ Create TypeScript configuration object
   ✓ Generate proper imports and exports
   ✓ Add comprehensive documentation comments

5. **Integration Phase**
   ✓ Write configuration file to correct location
   ✓ Update extract-toc-guided.ts with new config
   ✓ Validate TypeScript compilation

6. **Validation Phase**
   ✓ Test generated configuration
   ✓ Verify all sections are properly structured
   ✓ Confirm integration works correctly
```

## Success Indicators

- ✅ Configuration file created at correct location
- ✅ All sections and subsections properly extracted
- ✅ Page ranges logically assigned
- ✅ Priorities reflect journalism importance
- ✅ User exclusions properly applied
- ✅ Integration script updated successfully
- ✅ TypeScript compilation passes
- ✅ Ready for `yarn extract:toc-guided` execution

## Output Summary

```markdown
## TOC Configuration Generated Successfully! 🎉

**Document**: {Document Name}
**Config File**: packages/backend/src/config/toc/{document-id}-toc.config.ts
**Sections Found**: {total_sections}
**Subsections**: {total_subsections}
**Excluded Sections**: {excluded_count}

### Section Summary:
- Section 1: {title} (Pages {range}) - Priority {priority}
- Section 2: {title} (Pages {range}) - Priority {priority}
- ...

### Next Steps:
1. Review the generated configuration file
2. Run: `yarn extract:toc-guided {document-id}`
3. Check results in: `data/extracted/{document-id}-toc-guided-rules.json`

The configuration is now ready for use with your extraction pipeline!
```

## Command Execution Flow

When you run `/generate-toc-config packages/backend/assets/MANUAL_XYZ_index "Description here"`:

1. **🔍 Analysis Phase**: Read and analyze all screenshots in the folder
2. **🏗️ Structure Phase**: Build hierarchical document structure
3. **⚙️ Generation Phase**: Create TypeScript configuration file
4. **🔗 Integration Phase**: Update extraction scripts
5. **✅ Validation Phase**: Verify everything works correctly
6. **📋 Summary Phase**: Provide detailed results and next steps

This command transforms your manual TOC creation process into a single, intelligent, automated workflow.