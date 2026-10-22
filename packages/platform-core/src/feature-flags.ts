export interface FeatureFlagContext {
  region?: string;
  locale?: string;
  accountType?: string;
  userId?: string;
}

export type FeatureFlagRule = (context: FeatureFlagContext) => boolean;

export interface FeatureFlagDefinition {
  enabled: boolean | FeatureFlagRule;
}

export function createFeatureFlagResolver(
  definitions: Record<string, FeatureFlagDefinition>,
) {
  return (name: string, context: FeatureFlagContext = {}): boolean => {
    const definition = definitions[name];
    if (!definition) return false;
    return typeof definition.enabled === "function"
      ? definition.enabled(context)
      : definition.enabled;
  };
}
