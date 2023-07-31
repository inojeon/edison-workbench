import {
  LucideProps,
  Moon,
  SunMedium,
  Twitter,
  type Icon as LucideIcon,
} from "lucide-react"

export type Icon = LucideIcon

export const Icons = {
  sun: SunMedium,
  moon: Moon,
  twitter: Twitter,
  logo: (props: LucideProps) => (
    <svg
      version="1.1"
      id="_x32_"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      viewBox="0 0 512 512"
      xmlSpace="preserve"
      {...props}
    >
      <g>
        <path
          fill="currentColor"
          d="M475.619,295.498l-41.406-87.766c0.109-2.625,0.203-5.266,0.203-7.906
		c0-110.359-89.469-199.828-199.828-199.828S34.744,89.467,34.744,199.826c0,62.063,28.297,117.5,72.672,154.156v70.641
		c0,6.891,4.125,13.125,10.453,15.797l165.516,70.219c5.281,2.25,11.359,1.688,16.172-1.484c4.797-3.188,7.688-8.563,7.688-14.313
		v-59.844c0-9.484,7.688-17.172,17.172-17.172h84.75c9.484,0,17.156-7.703,17.156-17.172v-51.609c0-6.563,3.766-12.563,9.672-15.438
		l31.594-15.344C476.041,314.154,479.619,303.998,475.619,295.498z M234.588,335.717c-75.047,0-135.891-60.828-135.891-135.891
		c0-75.047,60.844-135.875,135.891-135.875s135.875,60.828,135.875,135.875C370.463,274.889,309.635,335.717,234.588,335.717z"
        />
        <path
          fill="currentColor"
          d="M330.432,216.623c3.672-0.281,6.484-3.328,6.484-7.016v-16.766c0-3.688-2.813-6.734-6.484-7.031l-22.234-1.734
		c-1.391-0.094-2.625-0.984-3.156-2.297l-7.328-17.656c-0.531-1.297-0.297-2.797,0.609-3.875l14.5-16.953
		c2.391-2.781,2.234-6.938-0.375-9.531l-11.859-11.875c-2.609-2.594-6.766-2.75-9.547-0.375l-16.953,14.5
		c-1.063,0.906-2.578,1.156-3.859,0.625l-17.656-7.328c-1.313-0.531-2.203-1.766-2.313-3.172l-1.719-22.219
		c-0.297-3.688-3.359-6.5-7.031-6.5h-16.781c-3.672,0-6.734,2.813-7.016,6.5l-1.719,22.219c-0.109,1.406-1.016,2.641-2.328,3.172
		l-17.641,7.328c-1.313,0.531-2.797,0.281-3.875-0.625l-16.953-14.5c-2.797-2.375-6.953-2.219-9.547,0.375l-11.859,11.875
		c-2.594,2.594-2.766,6.75-0.375,9.531l14.5,16.953c0.906,1.078,1.156,2.578,0.609,3.875l-7.313,17.656
		c-0.531,1.313-1.781,2.203-3.188,2.297l-22.234,1.734c-3.656,0.297-6.469,3.344-6.469,7.031v16.766
		c0,3.688,2.813,6.734,6.469,7.016l22.234,1.734c1.406,0.109,2.656,1,3.188,2.313l7.313,17.656c0.547,1.281,0.297,2.797-0.609,3.859
		l-14.5,16.969c-2.391,2.781-2.219,6.938,0.375,9.531l11.859,11.859c2.594,2.609,6.75,2.766,9.547,0.391l16.953-14.516
		c1.078-0.891,2.563-1.141,3.875-0.594l17.641,7.313c1.313,0.531,2.219,1.766,2.328,3.156l1.719,22.25
		c0.281,3.656,3.344,6.484,7.016,6.484h16.781c3.672,0,6.734-2.828,7.031-6.484l1.719-22.25c0.109-1.391,1-2.625,2.313-3.156
		l17.656-7.313c1.281-0.547,2.797-0.297,3.859,0.594l16.953,14.516c2.781,2.375,6.938,2.219,9.547-0.391l11.859-11.859
		c2.609-2.594,2.766-6.75,0.375-9.531l-14.5-16.969c-0.906-1.063-1.141-2.578-0.609-3.859l7.328-17.656
		c0.531-1.313,1.766-2.203,3.156-2.313L330.432,216.623z M233.119,236.311c-9.375,0-18.188-3.656-24.813-10.281
		s-10.266-15.438-10.266-24.797c0-9.375,3.641-18.188,10.266-24.813c6.625-6.641,15.438-10.281,24.813-10.281
		s18.188,3.641,24.813,10.281c6.625,6.625,10.266,15.438,10.266,24.813c0,9.359-3.641,18.172-10.266,24.797
		S242.494,236.311,233.119,236.311z"
        />
      </g>
    </svg>
  ),
  gitHub: (props: LucideProps) => (
    <svg viewBox="0 0 438.549 438.549" {...props}>
      <path
        fill="currentColor"
        d="M409.132 114.573c-19.608-33.596-46.205-60.194-79.798-79.8-33.598-19.607-70.277-29.408-110.063-29.408-39.781 0-76.472 9.804-110.063 29.408-33.596 19.605-60.192 46.204-79.8 79.8C9.803 148.168 0 184.854 0 224.63c0 47.78 13.94 90.745 41.827 128.906 27.884 38.164 63.906 64.572 108.063 79.227 5.14.954 8.945.283 11.419-1.996 2.475-2.282 3.711-5.14 3.711-8.562 0-.571-.049-5.708-.144-15.417a2549.81 2549.81 0 01-.144-25.406l-6.567 1.136c-4.187.767-9.469 1.092-15.846 1-6.374-.089-12.991-.757-19.842-1.999-6.854-1.231-13.229-4.086-19.13-8.559-5.898-4.473-10.085-10.328-12.56-17.556l-2.855-6.57c-1.903-4.374-4.899-9.233-8.992-14.559-4.093-5.331-8.232-8.945-12.419-10.848l-1.999-1.431c-1.332-.951-2.568-2.098-3.711-3.429-1.142-1.331-1.997-2.663-2.568-3.997-.572-1.335-.098-2.43 1.427-3.289 1.525-.859 4.281-1.276 8.28-1.276l5.708.853c3.807.763 8.516 3.042 14.133 6.851 5.614 3.806 10.229 8.754 13.846 14.842 4.38 7.806 9.657 13.754 15.846 17.847 6.184 4.093 12.419 6.136 18.699 6.136 6.28 0 11.704-.476 16.274-1.423 4.565-.952 8.848-2.383 12.847-4.285 1.713-12.758 6.377-22.559 13.988-29.41-10.848-1.14-20.601-2.857-29.264-5.14-8.658-2.286-17.605-5.996-26.835-11.14-9.235-5.137-16.896-11.516-22.985-19.126-6.09-7.614-11.088-17.61-14.987-29.979-3.901-12.374-5.852-26.648-5.852-42.826 0-23.035 7.52-42.637 22.557-58.817-7.044-17.318-6.379-36.732 1.997-58.24 5.52-1.715 13.706-.428 24.554 3.853 10.85 4.283 18.794 7.952 23.84 10.994 5.046 3.041 9.089 5.618 12.135 7.708 17.705-4.947 35.976-7.421 54.818-7.421s37.117 2.474 54.823 7.421l10.849-6.849c7.419-4.57 16.18-8.758 26.262-12.565 10.088-3.805 17.802-4.853 23.134-3.138 8.562 21.509 9.325 40.922 2.279 58.24 15.036 16.18 22.559 35.787 22.559 58.817 0 16.178-1.958 30.497-5.853 42.966-3.9 12.471-8.941 22.457-15.125 29.979-6.191 7.521-13.901 13.85-23.131 18.986-9.232 5.14-18.182 8.85-26.84 11.136-8.662 2.286-18.415 4.004-29.263 5.146 9.894 8.562 14.842 22.077 14.842 40.539v60.237c0 3.422 1.19 6.279 3.572 8.562 2.379 2.279 6.136 2.95 11.276 1.995 44.163-14.653 80.185-41.062 108.068-79.226 27.88-38.161 41.825-81.126 41.825-128.906-.01-39.771-9.818-76.454-29.414-110.049z"
      ></path>
    </svg>
  ),
}
