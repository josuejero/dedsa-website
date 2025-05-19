#!/bin/bash
# Script to update import paths

# Update component imports
find src -name "*.tsx" -o -name "*.ts" | xargs sed -i '' 's|from "../components/|from "@/core/components/|g'
find src -name "*.tsx" -o -name "*.ts" | xargs sed -i '' 's|from "../../components/|from "@/core/components/|g'
find src -name "*.tsx" -o -name "*.ts" | xargs sed -i '' 's|from "../../../components/|from "@/core/components/|g'

# Update utils imports
find src -name "*.tsx" -o -name "*.ts" | xargs sed -i '' 's|from "../utils/|from "@/core/utils/|g'
find src -name "*.tsx" -o -name "*.ts" | xargs sed -i '' 's|from "../../utils/|from "@/core/utils/|g'
find src -name "*.tsx" -o -name "*.ts" | xargs sed -i '' 's|from "../../../utils/|from "@/core/utils/|g'

# Update hooks imports
find src -name "*.tsx" -o -name "*.ts" | xargs sed -i '' 's|from "../hooks/|from "@/core/hooks/|g'
find src -name "*.tsx" -o -name "*.ts" | xargs sed -i '' 's|from "../../hooks/|from "@/core/hooks/|g'
find src -name "*.tsx" -o -name "*.ts" | xargs sed -i '' 's|from "../../../hooks/|from "@/core/hooks/|g'

# Update types imports
find src -name "*.tsx" -o -name "*.ts" | xargs sed -i '' 's|from "../types/|from "@/core/types/|g'
find src -name "*.tsx" -o -name "*.ts" | xargs sed -i '' 's|from "../../types/|from "@/core/types/|g'
find src -name "*.tsx" -o -name "*.ts" | xargs sed -i '' 's|from "../../../types/|from "@/core/types/|g'

# Update feature-specific imports (example for home)
find src -name "*.tsx" -o -name "*.ts" | xargs sed -i '' 's|from "../components/home/|from "@/features/home/components/|g'
find src -name "*.tsx" -o -name "*.ts" | xargs sed -i '' 's|from "../../components/home/|from "@/features/home/components/|g'