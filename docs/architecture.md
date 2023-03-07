## Speed types

The purpose of this app is converting between different speed types. By 
speed type we mean a pace (e.g. minutes per km), a speed (e.g. km per hour) or the type used for a given distance/lap.

## Conversion functions and config

In lib/conversion.ts there are functions to convert speed types to and from canonical kph.

In components/inputs all components for receiving a speed type as input are defined. And in components/results the components for displaying a result of a conversion are defined. These components use the corresponding functions from lib/conversion.ts to convert to/from canonical kph.

In lib/config.ts the different speed types are configured. Each speed type is defined with id, name, input component and result component.

## State

Every time a speed or pace or a time for a distance/lap is input in a page generated from [id].tsx a corresponding "canonical" kph i stored in context.

The input is always done in the input component of the page and in addition to updating cannoncial kph in context it keeps the speed, pace or time for a distance/lap it is representing in its own state with help of the useState hook.

Canonical kph is used by result components for calculating the result corresponding to the input component.

## Generation of static pages based on config

The function getAllCalculatorPaths in lib/config.ts is used to get a path for all possible combinations of speed types that we want to 
generate a calculator page for.

getAllCalculatorPaths is called from getStaticProps() in pages/[id].tsx to generate a static page for each combination of speed types. getStaticProps() is part of nextjs's Static Site Generation mechanism. 
Next.js will statically pre-render all the paths specified by getStaticPaths. getStaticPaths will only run during build in production, it will not be called during runtime. See [getStaticPaths doc](https://nextjs.org/docs/basic-features/data-fetching/get-static-paths).

