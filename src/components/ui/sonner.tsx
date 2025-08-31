import { useTheme } from "next-themes"
import { Toaster as Sonner } from "sonner"
import type { ToasterProps } from "sonner";

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast: "rounded-none !rounded-none", // add !important
        },
      }}
      style={
        {
          borderRadius: "0px",
          "--normal-bg": "black",
          "--normal-text": "white",
          "--normal-radius": "0px",
          "--success-bg": "black",
          "--success-text": "white",
          "--error-bg": "black",
          "--error-text": "white",
          "--warning-bg": "black",
          "--warning-text": "white",
        } as React.CSSProperties
      }
      {...props}
    />
  )
}

export { Toaster }
