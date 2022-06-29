import React from "react";
import Button from "./Button";
import Swatch from "./Swatch";
import { v4 as uuid } from "uuid";
type Props = {
  attributes: Array<{
    name: string;
    type?: string;
    items: Array<{ value: string }>;
  }>;
  selectedAttribute?: Array<{ attribute: string; value: string }>;
  onAttributeChange?: Function;
};

class Attributes extends React.Component<Props> {
  state: { attributes: Array<{ attribute: string; value: string }> } = {
    attributes: [],
  };
  isAttributeActive = (attribute: string, value: string) => {
    if (this.props.selectedAttribute) {
      //@ts-ignore
      const _attribute = this.props.selectedAttribute.find(
        (_attribute) =>
          _attribute.attribute === attribute && _attribute.value === value
      );
      if (_attribute) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  };
  componentDidMount = () => {
    if (this.props.selectedAttribute) {
      this.setState({ attributes: this.props.selectedAttribute });
    }
  };
  checkAllAttributesSelected = () => {};
  componentDidUpdate = (prevState: any) => {};
  updateAttributes = (attributeName: string, value: string) => {
    const _item = this.state.attributes.findIndex(
      (_attribute) => _attribute.attribute === attributeName
    );
    const attributes = this.state.attributes;
    // console.log("Item", _item);
    if (_item !== -1) {
      attributes[_item].value = value;
      this.setState(
        { attributes: attributes },
        () =>
          this.props.onAttributeChange &&
          this.props.onAttributeChange(this.state.attributes)
      );
    } else {
      attributes.push({ attribute: attributeName, value: value });
      this.setState(
        { attributes: attributes },
        () =>
          this.props.onAttributeChange &&
          this.props.onAttributeChange(this.state.attributes)
      );
    }
  };
  render() {
    return (
      <>
        {this.props.attributes.map((attribute) => {
          return (
            <React.Fragment key={uuid()}>
              <div key={uuid()} className="label">{`${attribute.name}:`}</div>
              <div className="flex flex-row flex-wrap gap-12 mb-2">
                {attribute.items.map((option) => {
                  //@ts-ignore
                  let display = option.displayValue;
                  //@ts-ignore
                  if (attribute.type === "text")
                    return (
                      <Button
                        variant="secondary"
                        key={uuid()}
                        className="size-btn"
                        size="sm"
                        data-active={this.isAttributeActive(
                          attribute.name,
                          option.value
                        )}
                        onClick={() => {
                          this.updateAttributes(attribute.name, option.value);
                        }}
                      >
                        {display}
                      </Button>
                    );
                  //@ts-ignore
                  if (attribute.type === "swatch") {
                    return (
                      <Swatch
                        className="swatch"
                        key={uuid()}
                        data-active={this.isAttributeActive(
                          attribute.name,
                          display
                        )}
                        color={`${option.value}`}
                        onClick={() => {
                          this.updateAttributes(attribute.name, display);
                        }}
                      />
                    );
                  }
                  return <React.Fragment key={uuid()} />;
                })}
              </div>
            </React.Fragment>
          );
        })}
      </>
    );
  }
}
export default Attributes;
