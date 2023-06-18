import { Button as TButton, styled } from "tamagui";
import { ArrowLeft } from  '@tamagui/lucide-icons'

export const Button = styled(TButton, {
    w: "$15",
    h: "$5",

    variants: {
        background: {
            normal: {
                bg: "$blue11"
            },
            outline: {
                borderWidth: "$1",
                borderColor: "$blue11"
            },
            back: {
                icon: ArrowLeft,
            }
        }
    },

    defaultVariants: {
        background: "normal"
    }
})