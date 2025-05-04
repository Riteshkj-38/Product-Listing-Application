import {render, screen} from '@testing-library/react';
import Products from '../Products';
import {describe, expect, test} from 'vitest';

describe('Test Suite for Product List Component', ()=> {
    test(`Validate component has been rendered with 'No Products Found'`, ()=> {
        render(<Products/>)
        expect(screen.getByText('').not.toBeInTheDocument());
    })
    test(`Validate component has been rendered with 'No Products Found'`, ()=> {
        render(<Products/>)
        screen.logTestingPlaygroundURL()
        expect(screen.queryAllByText('').not.toBeInTheDocument());
    })
})