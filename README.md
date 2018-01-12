# React Steps

A set of steppers components for you to use in your react projects.

## Examples

### Arrows

![default](./docs/screenshots/arrows/default.png)
![custom blue](./docs/screenshots/arrows/blue.png)
![custom gold/pink](./docs/screenshots/arrows/gold-pink.png)
![custom dark](./docs/screenshots/arrows/dark.png)
![custom dark](./docs/screenshots/arrows/red.png)

## Quick usage

The quickest way for you to use a stepper component in your project is by using a package manager to install it, and a ES6 ready environment.

```shell
npm install awesome-react-steps
# or
yarn add awesome-react-steps
```

Import the stepper you want, its styles, and the model class.

> We have implemented only the Arrows stepper, but more steppers will be available soon. :)

```js
import "./node_modules/awesome-react-steps/dist/awesome-react-steps.css";
import { Arrows, Model, StepState } from "awesome-react-steps";
```

Create the object model for your stepper component and manage it in your container state.
This object is immutable but it provides a lot of functions for you to generate the next state easily:

```js
const model = new Model({
  steps: [
    { label: "First step" },
    { label: "Step two" },
    { label: "Final step" }
  ]
});
```

> Initially all steps are in an `UNTOUCHED` state, but you can specify any state you want for each step

> Each stepper can render its steps differently based on these states.

Include your stepper in your container:

```html
<Arrows model={model} />
```

And then change its model to render the state you need.

```js
model = model
  .skip() // sets the current step state to SKIPPED
  .next() // advance to the next step
  .done(); // sets it to DONE state

// Then updates your container state with the new model
```

## Coming features

* New steppers types

## API

### Model class

```js
import { Model } from "awesome-react-steps";
```

#### Setting step states

```js
// You can set the current step state using these functions
model = model.skip();
model = model.done();
model = model.invalidate();

// You can also set it directly
model = model.setStepState(myNewState);
```

#### Moving throw steps

```js
/// You can move around using these functions
model = model.next();
model = model.previous();

// You can also set the current step directly
model = model.setCurrent(2);
```

### StepState type

```js
import { StepState } from "awesome-react-steps";
```

```js
// The following states are available
StepState.UNTOUCHED;
StepState.DONE;
StepState.SKIPPED;
StepState.INVALID;
```

> These states are used by each stepper for rendering. Not all steppers will use all these states when rendering. But in your custom styles you can render steps using their states.

## Customizing styles

### Arrows

The classes used for each part of the stepper:

```css
/* The root element of the Arrows stepper. The background should be customized in this class.  */
.Arrows

/* The element which holds a step */
.Arrows--step

/* The SVG element used to draw the arrow in the background of each step */
.Arrows--step--arrow

/* The elements for the number and the label of each step */
.Arrows--step--number
.Arrows--step--label
```

The classes for the states of the stepper. You can combine these one with the classes of the stepper parts to custom the rendering style for different states of the stepper.

```css
.Arrows--step__current /* Current step */
.Arrows--step__passed /* Steps before the current step */
.Arrows--step__coming /* Steps after the current step */
```

> We haven't implemented classes for step states in the Arrows stepper component.

## Contributing

Open an issue if you encounter a bug or want some new feature. We will apreciate if you write us some pull requests too.

## License

MIT License
