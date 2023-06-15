import { Input as TInput, styled } from 'tamagui'

export const Input = styled(TInput, {
    size: "$4",

    variants: {
        background: {
            normal: {
                bg: "$blue8"
            },
            outline: {
                borderWidth: "$1",
                borderColor: "$blue8"
            }
        }
    },

    defaultVariants: {
        background: "outline"
    }
})