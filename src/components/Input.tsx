import { Input as TInput, styled } from 'tamagui'

export const Input = styled(TInput, {
    size: "$4",

    variants: {
        // pin: {
        //     top: {
        //       position: 'relative',
        //       top: 100,
        //     },
        //   },
        background: {
            normal: {
                bg: "$blue10"
            },
            outline: {
                borderWidth: "$1",
                borderColor: "$blue10"
            }
        }
    } as const,

    defaultVariants: {
        background: "outline"
    }
})