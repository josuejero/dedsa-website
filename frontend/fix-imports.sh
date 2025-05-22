#!/bin/bash

# Fix import paths in the codebase
echo "Fixing import paths..."

# Fix layout component imports
sed -i '' "s|from '../components/Footer'|from '../core/components/layout/Footer'|g" src/app/layout.tsx
sed -i '' "s|from '../components/Header'|from '../core/components/layout/Header'|g" src/app/layout.tsx

# Fix home component imports to use correct paths
find src/features/home -name "*.tsx" -exec sed -i '' "s|from '../ui/|from './ui/|g" {} \;
find src/features/home -name "*.tsx" -exec sed -i '' "s|from '../../content/consolidated/|from '../../../content/consolidated/|g" {} \;
find src/features/home -name "*.tsx" -exec sed -i '' "s|from '../../types/content/|from '../../../types/content/|g" {} \;
find src/features/home -name "*.tsx" -exec sed -i '' "s|from '../../utils/|from '../../../utils/|g" {} \;

# Fix bylaws component imports
find src/features/bylaws -name "*.tsx" -exec sed -i '' "s|from '../../../content/bylaws/|from '../../../content/bylaws/|g" {} \;
find src/features/bylaws -name "*.tsx" -exec sed -i '' "s|from '../../../types/content/|from '../../../types/content/|g" {} \;

echo "Import paths fixed!"