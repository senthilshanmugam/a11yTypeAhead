# Accessible Type Ahead

Accessible Type Ahead directive.

## Demo
See Live Demo @ <a href="http://a11yTypeAhead.azurewebsites.net">http://a11yTypeAhead.azurewebsites.net</a>

## Usage
```html
<a11y-type-ahead a11y-uid="AsianCountriesList"
        a11y-aria-label="Asian Countries List"
        on-search="onItemSearchCountries(searchString)"
        get-option-template="getOptionTemplate1(suggestion)"
        get-option-text="getSelectedItemText1(itemSelected)"
        on-select="onItemSelected()"
        selected-text="name">
</a11y-type-ahead>
```

## a11y-type-ahead

This project is generated with [yo angular generator](https://github.com/yeoman/generator-angular)
version 0.15.1.

## Build & development

Run `grunt` for building and `grunt serve` for preview.

## Testing

Running `grunt test` will run the unit tests with karma (in progress).
