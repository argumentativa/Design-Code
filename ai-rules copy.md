// .building-components - 

When building components:
all components are static, no states, always pull from our design tokens: colors, text, buttons, sizing, typography, radius, shadows. apply semantic tokens to keep everything consistent. build with responsive in mind, do not create new tokens if they were not initially supplied, instead localize all the ones that don't have tokens in a new file so we can label and then categorizse them properly
spacing tokens should never be semantic. always reference and use design-tokens.css
do use inline svg's. reference them from the library and use source to render in code
never create new tokens for spacing units. always use the foundational in design-tokens.css for every single component
