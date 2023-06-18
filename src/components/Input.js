import { Input as TInput, styled } from 'tamagui'

export const Input = styled(TInput, {
    size: "$4",

    variants: {
        background: {
            normal: {
                bg: "$blue11"
            },
            outline: {
                borderWidth: "$1",
                borderColor: "$blue11"
            }
        }
    },

    defaultVariants: {
        background: "outline"
    }
})