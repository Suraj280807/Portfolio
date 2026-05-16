const fs = require('fs');
const path = require('path');

const dirs = [
  'c:/Users/Admin/Downloads/Premium Modern Portfolio UI/src/app/components',
  'c:/Users/Admin/Downloads/Premium Modern Portfolio UI/src/components'
];

const colorReplacements = [
  { regex: /from-(blue|purple|pink|cyan|green|red|orange|yellow|teal|emerald|sky|indigo|violet|fuchsia|amber)-[12]00/g, replacement: 'from-gray-100' },
  { regex: /from-(blue|purple|pink|cyan|green|red|orange|yellow|teal|emerald|sky|indigo|violet|fuchsia|amber)-[34]00/g, replacement: 'from-gray-300' },
  { regex: /from-(blue|purple|pink|cyan|green|red|orange|yellow|teal|emerald|sky|indigo|violet|fuchsia|amber)-[56]00/g, replacement: 'from-gray-500' },
  { regex: /from-(blue|purple|pink|cyan|green|red|orange|yellow|teal|emerald|sky|indigo|violet|fuchsia|amber)-[789]00/g, replacement: 'from-gray-800' },
  
  { regex: /via-(blue|purple|pink|cyan|green|red|orange|yellow|teal|emerald|sky|indigo|violet|fuchsia|amber)-[12]00/g, replacement: 'via-gray-100' },
  { regex: /via-(blue|purple|pink|cyan|green|red|orange|yellow|teal|emerald|sky|indigo|violet|fuchsia|amber)-[34]00/g, replacement: 'via-gray-300' },
  { regex: /via-(blue|purple|pink|cyan|green|red|orange|yellow|teal|emerald|sky|indigo|violet|fuchsia|amber)-[56]00/g, replacement: 'via-gray-500' },
  { regex: /via-(blue|purple|pink|cyan|green|red|orange|yellow|teal|emerald|sky|indigo|violet|fuchsia|amber)-[789]00/g, replacement: 'via-gray-800' },

  { regex: /to-(blue|purple|pink|cyan|green|red|orange|yellow|teal|emerald|sky|indigo|violet|fuchsia|amber)-[12]00/g, replacement: 'to-gray-100' },
  { regex: /to-(blue|purple|pink|cyan|green|red|orange|yellow|teal|emerald|sky|indigo|violet|fuchsia|amber)-[34]00/g, replacement: 'to-gray-300' },
  { regex: /to-(blue|purple|pink|cyan|green|red|orange|yellow|teal|emerald|sky|indigo|violet|fuchsia|amber)-[56]00/g, replacement: 'to-gray-500' },
  { regex: /to-(blue|purple|pink|cyan|green|red|orange|yellow|teal|emerald|sky|indigo|violet|fuchsia|amber)-[789]00/g, replacement: 'to-gray-800' },

  { regex: /text-(blue|purple|pink|cyan|green|red|orange|yellow|teal|emerald|sky|indigo|violet|fuchsia|amber)-[12]00/g, replacement: 'text-gray-300' },
  { regex: /text-(blue|purple|pink|cyan|green|red|orange|yellow|teal|emerald|sky|indigo|violet|fuchsia|amber)-[34]00/g, replacement: 'text-gray-400' },
  { regex: /text-(blue|purple|pink|cyan|green|red|orange|yellow|teal|emerald|sky|indigo|violet|fuchsia|amber)-[56]00/g, replacement: 'text-gray-600' },
  { regex: /text-(blue|purple|pink|cyan|green|red|orange|yellow|teal|emerald|sky|indigo|violet|fuchsia|amber)-[789]00/g, replacement: 'text-black' },

  { regex: /bg-(blue|purple|pink|cyan|green|red|orange|yellow|teal|emerald|sky|indigo|violet|fuchsia|amber)-[12]00/g, replacement: 'bg-gray-100' },
  { regex: /bg-(blue|purple|pink|cyan|green|red|orange|yellow|teal|emerald|sky|indigo|violet|fuchsia|amber)-[34]00/g, replacement: 'bg-gray-300' },
  { regex: /bg-(blue|purple|pink|cyan|green|red|orange|yellow|teal|emerald|sky|indigo|violet|fuchsia|amber)-[56]00/g, replacement: 'bg-gray-800' },
  { regex: /bg-(blue|purple|pink|cyan|green|red|orange|yellow|teal|emerald|sky|indigo|violet|fuchsia|amber)-[789]00/g, replacement: 'bg-black' },
  
  { regex: /border-(blue|purple|pink|cyan|green|red|orange|yellow|teal|emerald|sky|indigo|violet|fuchsia|amber)-[12]00/g, replacement: 'border-gray-200' },
  { regex: /border-(blue|purple|pink|cyan|green|red|orange|yellow|teal|emerald|sky|indigo|violet|fuchsia|amber)-[34]00/g, replacement: 'border-gray-400' },
  { regex: /border-(blue|purple|pink|cyan|green|red|orange|yellow|teal|emerald|sky|indigo|violet|fuchsia|amber)-[56]00/g, replacement: 'border-gray-600' },
  { regex: /border-(blue|purple|pink|cyan|green|red|orange|yellow|teal|emerald|sky|indigo|violet|fuchsia|amber)-[789]00/g, replacement: 'border-black' },

  { regex: /shadow-(blue|purple|pink|cyan|green|red|orange|yellow|teal|emerald|sky|indigo|violet|fuchsia|amber)-[1-9]00\/[0-9]+/g, replacement: 'shadow-black/10' },
  { regex: /shadow-(blue|purple|pink|cyan|green|red|orange|yellow|teal|emerald|sky|indigo|violet|fuchsia|amber)-[1-9]00/g, replacement: 'shadow-black/10' },
];

dirs.forEach(dir => {
  if (fs.existsSync(dir)) {
    const files = fs.readdirSync(dir).filter(f => f.endsWith('.tsx'));
    for (const file of files) {
      const filePath = path.join(dir, file);
      let content = fs.readFileSync(filePath, 'utf8');
      for (const rep of colorReplacements) {
        content = content.replace(rep.regex, rep.replacement);
      }
      fs.writeFileSync(filePath, content, 'utf8');
    }
  }
});
