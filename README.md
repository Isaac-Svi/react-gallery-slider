# Documentation for react-gallery-slider
Hey there!

react-gallery-slider is a react version of gallery-slider-js.  It is a library that I created with the purpose of making it easier for anyone to easily add a good-looking gallery into their site. It's still a work-in-progress, so any feedback/constructive criticism would be appreciated!

With that being said, here are some instructions as to how this mini library is intended to be used.



## [](https://github.com/Isaac-Svi/gallery-slider-js#to-install)To install:

	npm i gallery-slider

## [](https://github.com/Isaac-Svi/gallery-slider-js#to-use-in-your-react-project)To use in your react project:

```react
<GallerySlider json={json} />
```
This will insert a gallery slider in your project.  Customized styling, functionality, and content for your gallery will all come from the `json` prop.  We'll discuss how to configure this prop in the coming sections.
 
## [](https://github.com/Isaac-Svi/gallery-slider-js#customizing-and-adding-content-to-your-gallery-slider)Customizing and adding content to your gallery-slider:

All of the the content and customization of the gallery slider come from a `.json` file.  Let's call our file `gallery-slider.json`.  You can place this file wherever is convenient for you as long as you can import it into the file using the `<GallerySlider />` component.  I'm going to put it in the same folder as the file using `<GallerySlider />` and import it like so:

```javascript
import * as json from './gallery-slider.json'
```

## [](https://github.com/Isaac-Svi/gallery-slider-js#how-to-configure-the-json-file)How to configure the JSON file:

### Styling/customization parameters:

-   **font**: Insert your desired font here like you would for any element in CSS. If left empty, gallery will use whatever default font your project is using.

-   **baseSize**:  This refers to the width of our active card, meaning the card currently in the center of the gallery. This is the item currently being presented in our slider.

-   **reflection**: Boolean value. If `true`, will add reflection to the active image. If omitted, default will be true.  To remove reflection, make `false`.

- **cardRatio**: Floating point number.  Defines how many times bigger the active card is than the inactive cards.  Meaning, the inactive cards will always be 2.5 times smaller than the active card.

- **objectFit**: Works just like the CSS property.  Defines how the images inserted in the gallery will be presented in their parent elements, which in this case are the gallery cards.

- **sliderArrowColor**: Defines the color of the left and right arrows that allow navigation through the gallery.  Can be defined like the normal CSS `color` property.

- **backgroundColor**: Defines background color of cards if desired.  Works like CSS `background-color` property.

- **sliderInterval**: Number of milliseconds.  This is an optional property.  If added, it adds an animation to the gallery, causing the cards to flip and move to the left after every defined number of milliseconds passes.  Don't add this property if animation isn't desired.

- **cardSpeed**: A string.  Enter a specific amount of time here the same way you'd do for a CSS transition, like so: `1s` or `400ms`.  Defines the length of time a transition effect will take on each card.  It defines, how long it will take for a card to flip as well as how fast the gallery shifts to the right or left when the navigation arrows are clicked on.

- **align**: Same as HTML `align` attribute.  Aligns the text in the cards `ltr` or `rtl`, etc.

### Content parameters:

- **btnTxt**: Add text for the card "flip" buttons here.

- **placeHolderImage**: Back-up image to show on the cards if the other images take time to load.
    
-   **src**  : Takes a 2d array, which can be filled up with links to all the images to be displayed, as follows:

```json
"src" : [
   	[
	   	"<url for image for front image of card 1>", 
	   	"<url used for back image of card 1>"
	],
   	[
	   	"<url for image for front image of card 2>",
	   	"<url used for back image of card 2>"
	]
],
```  
In this example, we've made 2 cards with 2 sides each. If a sub-index is left empty, a message of "Image Unavailable" will be shown.

-  **pictureInfo**  : This last key in our JSON object should hold a 2d array. It will hold the text that will be displayed on each side of each card, each index and sub-index matching  `src`  respectively, like so:

```json
"pictureInfo" : [
	[
	 	{
			"header" : "Header 1.1",
			"text" : "Text 1.1"
		},
		{
			"header" : "Header 1.2",
			"text" : "Text 1.2"
		}
	],
	[
		{
			"header" : "Header 2.1",
			"text" : "Text 2.1"
		},
		{
			"header" : "Header 2.2",
			"text" : "Text 2.2"
		}
	]
],
 ```
If needed, HTML can be added to the content of the cards!  This feature is very rough currently, and it will be improved in the future to work more smoothly with React, but for now, HTML can be added like so:
```json
[
	{
		"header" : "Header 2.1",
		"text" : "Text 2.1",
		"html": "<button> Click me! </button>"
	},
	{
		"header" : "Header 2.2",
		"text" : "Text 2.2",
		"html": "<button> I'm another button. </button>"
	}
]
```

Well, that's it!  With this, we should have 2 cards with different pictures and descriptions on each side, as well as some HTML.

Thanks for making it all the way down here.  Please let me know how this can be improved in Github.

----------

I hope this can help out whoever uses this. Take care, and be well!  👋
