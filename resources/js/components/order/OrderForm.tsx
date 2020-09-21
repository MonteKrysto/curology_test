import React, { useEffect, useReducer, useState } from "react";
import { useForm } from "react-hook-form";
import { initialState, formReducer } from "./orderState";
import Field from "../controls/form/field";
import { Select } from "../controls/form/select";
import { useSendToMachine, useFetchState } from "../context/fetchContext";
import { Alert } from "../controls/form/alert";
import { Box, Header, ImgContainer, Text } from "../styles/orderStyles";

interface Props {}

/**
 * The order form.
 *
 * The fields contained in the form contain logic for validation.  The validation
 * rules can be extracted to a class, or an object, and provide the necessary rules.
 *
 * 
 * @param props
 */
const OrderForm: React.FC<Props> = props => {
    const [totalCost, setTotalCost] = useState(0);
    const [submitStatus, setSubmitStatus] = useState({
        status: "",
        message: ""
    });
    const [formState, dispatch] = useReducer(formReducer, initialState);
    const { createNew } = useSendToMachine();
    const { fetchState } = useFetchState();

    /**
     * When the machine returns its state set the message to be displayed to the user
     * and clear the form.
     *
     * NOTE:  This functinality can be shortened by the context provider
     * and return only the status, but for quickness it is done here
     */
    useEffect(() => {
        if (fetchState.context.results.status === 201 ||fetchState.context.results.status === 200) {
            setSubmitStatus({
                status: "success",
                message: "Your order has been placed!"
            });
            dispatch({ type: "CLEAR_FORM" });
            setTotalCost(0);
        } else if (
            fetchState.context.results.status !== 201 &&
            fetchState.context.results.status !== undefined
        ) {
            setSubmitStatus({
                status: "error",
                message: fetchState.context.results.data.message
            });
        }
    }, [fetchState.context]);


    /**
     * Use the use-form-hook to add validation to the fields
     */
    const { register, errors, handleSubmit } = useForm({
        mode: "onBlur"
    });

    /**
     * Submit the form
     */
    const onSubmit = () => {
        createNew(formState);
    };

    /**
     * Calculate the total cost depending on quantity selected
     *
     * @param val
     */
    const handleTotalCost = (val: number) => {
        const total = val * 49.99;
        setTotalCost(total);
        dispatch({
            type: "FIRST_LEVEL",
            field: "quantity",
            value: val
        });
        dispatch({
            type: "FIRST_LEVEL",
            field: "total",
            value: total
        });
    };

    /**
     * When the field changes send an action to the form reducer to update the state
     *
     * @param type
     * @param field
     * @param val
     * @param parent
     */
    const handleChange = (
        type: string,
        field: string,
        val: string | number,
        parent?: string
    ) => {
        dispatch({
            type,
            field,
            parent,
            value: val
        });
    };

    return (
        <>
            {submitStatus.status !== "" && (
                <Box position="relative" color="transparent">
                    <Alert
                        type={submitStatus.status}
                        title="Some Title"
                        message={submitStatus.message}
                    />
                </Box>
            )}
            <Box
                position="relative"
                color="white"
                other="container flex justify-center mt-20"
            >
                <ImgContainer
                    right="0"
                    width="1/2"
                    height="56"
                    imgWidth="full"
                    src="/images/potion.jpg"
                />

                <Box
                    color="transparent"
                    position="relative"
                    other="pt-12 pb-16 px-4 sm:pt-16 sm:px-6 lg:px-8 lg:max-w-7xl lg:mx-auto lg:grid lg:grid-cols-2"
                >
                    <Box
                        color="transparent"
                        position="relative"
                        other="lg:-my-16 lg:pr-8"
                    >
                        <Box
                            color="transparent"
                            position="relative"
                            other="max-w-md mx-auto sm:max-w-lg lg:mx-0"
                        >
                            <Header size="3xl" text="Curology Magic Postion" />
                            <Text
                                margin="4"
                                color="gray-600"
                                text="We have just created a revolutionary potion that
                            will take your skincare to a completely new level."
                            />
                            <Text
                                margin="4"
                                color="gray-600"
                                text="Supplies are limited to 3 bottles of Curology Magic
                            Potion per customer per month"
                            />

                            <Text
                                margin="4"
                                color="gray-600"
                                text="Just 49.99!"
                            />

                            <Box
                                color="transparent"
                                position="relative"
                                other="flex mt-10 justify-between"
                            >
                                <Select
                                    defaultText="Select a quantity"
                                    label="Quantity"
                                    value={formState.quantity}
                                    errors={errors["Quantity"]}
                                    options={[
                                        { value: "1", text: "1" },
                                        { value: "2", text: "2" },
                                        { value: "3", text: "3" }
                                    ]}
                                    onChange={val => handleTotalCost(val)}
                                    ref={register({
                                        required: {
                                            value: true,
                                            message: "Please select a quantity"
                                        }
                                    })}
                                />
                                <input
                                    type="input"
                                    className="bg-white pt-4 ml-10 text-lg -mt-3"
                                    readOnly
                                    disabled
                                    value={`$${totalCost}`}
                                    onChange={e =>
                                        handleChange(
                                            "FIRST_LEVEL",
                                            "total",
                                            (
                                                formState.quantity * 49.99
                                            ).toString()
                                        )
                                    }
                                />
                            </Box>
                            <Box
                                color="indigo-700"
                                other="mt-20 p-3 border-b-2 pb-3"
                            >
                                <h3 className="text-lg leading-6 font-medium text-gray-300">
                                    Payment Information
                                </h3>
                                <Text
                                    margin="1"
                                    color="gray-500"
                                    text="This information will be displayed publicly so
                                be careful what you share."
                                />
                            </Box>
                            <Box
                                color="transparent"
                                position="relative"
                                other="mt-10"
                            >
                                <form
                                    onSubmit={handleSubmit(onSubmit)}
                                    className="mt-9 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8"
                                >
                                    <Field
                                        label="First Name"
                                        value={formState.firstName}
                                        onChange={val =>
                                            handleChange(
                                                "FIRST_LEVEL",
                                                "firstName",
                                                val
                                            )
                                        }
                                        errors={errors["First Name"]}
                                        ref={register({
                                            required: true,
                                            pattern: /^[a-z\-_\s]+$/i,
                                            minLength: {
                                                value: 2,
                                                message:
                                                    "Please supply a valid first name"
                                            }
                                        })}
                                    />
                                    <Field
                                        label="Last Name"
                                        value={formState.lastName}
                                        onChange={val =>
                                            handleChange(
                                                "FIRST_LEVEL",
                                                "lastName",
                                                val
                                            )
                                        }
                                        errors={errors["Last Name"]}
                                        ref={register({
                                            required: {
                                                value: true,
                                                message: "Last name is required"
                                            },
                                            pattern: {
                                                value: /^[a-z\-_\s]+$/i,
                                                message:
                                                    "Please supply a valid last name"
                                            }
                                        })}
                                    />
                                    <Box
                                        color="transparent"
                                        position="relative"
                                        other="sm:col-span-2"
                                    >
                                        <Field
                                            label="Email Address"
                                            inputType="email"
                                            value={formState.email}
                                            onChange={val =>
                                                handleChange(
                                                    "FIRST_LEVEL",
                                                    "email",
                                                    val
                                                )
                                            }
                                            errors={errors["Email Address"]}
                                            ref={register({
                                                required: {
                                                    value: true,
                                                    message:
                                                        "Please supply an email"
                                                },
                                                pattern: {
                                                    value: /^[0-9?A-z0-9?]+(\.)?[0-9?A-z0-9?]+@[A-z]+\.[A-z]{3}.?[A-z]{0,3}$/i,
                                                    message: "Not a valid email"
                                                }
                                            })}
                                        />
                                    </Box>
                                    <Field
                                        label="Phone"
                                        value={formState.phone}
                                        onChange={val =>
                                            handleChange(
                                                "FIRST_LEVEL",
                                                "phone",
                                                val
                                            )
                                        }
                                        errors={errors["Phone"]}
                                        ref={register({
                                            required: {
                                                value: true,
                                                message:
                                                    "Please supply a phone number"
                                            },
                                            pattern: {
                                                value: /^(?:\+?1[-.●]?)?\(?([0-9]{3})\)?[-.●]?([0-9]{3})[-.●]?([0-9]{4})$/i,
                                                message:
                                                    "Not a valid phone number"
                                            }
                                        })}
                                    />

                                    <Field
                                        label="Address 1"
                                        value={formState.address.street1}
                                        onChange={val =>
                                            handleChange(
                                                "SECOND_LEVEL",
                                                "street1",
                                                val,
                                                "address"
                                            )
                                        }
                                        errors={errors["Address 1"]}
                                        ref={register({
                                            required: {
                                                value: true,
                                                message:
                                                    "Please supply a street address"
                                            },
                                            pattern: {
                                                value: /^[a-zA-Z0-9\s,.'-]{3,}$/i,
                                                message: "Not a valid address"
                                            }
                                        })}
                                    />
                                    <Field
                                        label="Address 2"
                                        value={formState.address.street2}
                                        onChange={val =>
                                            handleChange(
                                                "SECOND_LEVEL",
                                                "street2",
                                                val,
                                                "address"
                                            )
                                        }
                                        errors={errors["Address 2"]}
                                        ref={register({
                                            pattern: {
                                                value: /^[a-zA-Z0-9\s,.'-]{3,}$/i,
                                                message: "Not a valid address"
                                            }
                                        })}
                                    />
                                    <Field
                                        label="City"
                                        value={formState.address.city}
                                        onChange={val =>
                                            handleChange(
                                                "SECOND_LEVEL",
                                                "city",
                                                val,
                                                "address"
                                            )
                                        }
                                        errors={errors["City"]}
                                        ref={register({
                                            required: {
                                                value: true,
                                                message: "Please supply a city"
                                            },
                                            pattern: /^[a-z\d\-_\s]+$/i
                                        })}
                                    />
                                    <Field
                                        label="State"
                                        value={formState.address.state}
                                        onChange={val =>
                                            handleChange(
                                                "SECOND_LEVEL",
                                                "state",
                                                val,
                                                "address"
                                            )
                                        }
                                        errors={errors["State"]}
                                        ref={register({
                                            required: {
                                                value: true,
                                                message: "Please supply a state"
                                            },
                                            maxLength: {
                                                value: 2,
                                                message: "State abbreviation"
                                            },
                                            pattern: {
                                                value: /^[a-z\d\-_\s]+$/i,
                                                message: "That is not a state"
                                            }
                                        })}
                                    />
                                    <Field
                                        label="Zip Code"
                                        value={formState.address.zip}
                                        onChange={val =>
                                            handleChange(
                                                "SECOND_LEVEL",
                                                "zip",
                                                val,
                                                "address"
                                            )
                                        }
                                        errors={errors["Zip Code"]}
                                        ref={register({
                                            required: {
                                                value: true,
                                                message:
                                                    "Please supply a zip code"
                                            },
                                            pattern: {
                                                value: /^[0-9]+$/i,
                                                message: "Not a valid zip code"
                                            }
                                        })}
                                    />
                                    <Box
                                        color="transparent"
                                        position="relative"
                                        other="mt-2 sm:col-span-2"
                                    >
                                        <Field
                                            label="Credit Card Number"
                                            value={formState.payment.ccNum}
                                            onChange={val =>
                                                handleChange(
                                                    "SECOND_LEVEL",
                                                    "ccNum",
                                                    val,
                                                    "payment"
                                                )
                                            }
                                            errors={
                                                errors["Credit Card Number"]
                                            }
                                            ref={register({
                                                required: {
                                                    value: true,
                                                    message:
                                                        "Please supply a credit card number"
                                                },
                                                pattern: /^[0-9]+$/i
                                            })}
                                        />
                                    </Box>
                                    <Box
                                        color="transparent"
                                        position="relative"
                                        other="mt-2 sm:col-span-2"
                                    >
                                        <Field
                                            label="Expiration"
                                            value={formState.payment.exp}
                                            onChange={val =>
                                                handleChange(
                                                    "SECOND_LEVEL",
                                                    "exp",
                                                    val,
                                                    "payment"
                                                )
                                            }
                                            errors={errors["Expiration"]}
                                            ref={register({
                                                required: {
                                                    value: true,
                                                    message:
                                                        "Please supply an expiration date"
                                                },
                                                pattern: {
                                                    value: /^(0[1-9]|1[0-2])\/?([0-9]{2})$/i,
                                                    message:
                                                        "What kind of date is that?? Give a valie one"
                                                }
                                            })}
                                        />
                                    </Box>
                                    <Box
                                        color="transparent"
                                        position="relative"
                                        other="text-right sm:col-span-2"
                                    >
                                        <span className="inline-flex rounded-md shadow-sm">
                                            <button
                                                type="submit"
                                                className="inline-flex justify-center py-2 px-4 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out"
                                            >
                                                Submit
                                            </button>
                                        </span>
                                    </Box>
                                </form>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </>
    );
};

export default OrderForm;
