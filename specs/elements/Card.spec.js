import React from 'react'
import Card from 'elements/Card'
import renderer from 'react-test-renderer'

//first react test with jest so its simple
//dont judge me
test('className passed in should be in classList', () => {
    const component = renderer.create(
        <Card className="my-class">
            Hello
        </Card>
    )

    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
})

test('children passed in should be rendered in container', () => {
    const component = renderer.create(
        <Card className="super-awesome-class">
            This is the text in the Card
        </Card>
    )

    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
})