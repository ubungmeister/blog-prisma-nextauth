import React from 'react';
import {fireEvent, render, screen, waitFor} from "@testing-library/react";
import "@testing-library/dom"
import Register from "@/components/authentication/Register";
import {NextRouter, Router, useRouter} from "next/router";


jest.mock('next/router', () => ({
    useRouter: jest.fn(),
}));

describe('Register component', () => {
    const router: NextRouter = {
        route: '/',
        pathname: '/',
        query: {},
        asPath: '/',
        push: jest.fn(),
        replace: jest.fn(),
        reload: jest.fn(),
        back: jest.fn(),
        prefetch: jest.fn(),
        beforePopState: jest.fn(),
        events: {
            on: jest.fn(),
            off: jest.fn(),
            emit: jest.fn(),
        },
        isFallback: false,
        isReady: false,
        isPreview: false,
    };
    useRouter.mockImplementation(() => router);

    test('should have 3 inputs', () => {


        render(<Register />);

        const countInputs = screen.getAllByRole("textbox")

        expect(countInputs).toHaveLength(3)

    });

});