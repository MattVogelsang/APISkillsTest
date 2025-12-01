# Healthcare Dashboard Design Specifications

## Overview
Design extracted from Adobe XD: https://xd.adobe.com/view/121254c9-532f-4772-a1ba-dfe529a96b39-4741/

## Layout Structure

### Top Navigation Bar
- **Breadcrumb Navigation**: "2024 FED API Skills Test > HealthCare Dashboard"
- **Text Color**: Dark gray
- **Left Side**: Grid icon
- **Right Side**: Two floating circular action buttons
  - Top: `</>` (code brackets icon)
  - Bottom: `{}` (curly braces icon) - appears to have active state with light blue border

### Left Sidebar
- **Card 1 (Top)**: Light purple background
  - Contains text "Average" or similar metric
- **Card 2 (Bottom)**: Light pink background
  - Contains text "Average" or similar metric
- Appears to be data visualization/summary cards

### Main Content Area

#### Patient Information Card
- **Background**: White
- **Border Radius**: Rounded corners
- **Profile Picture**: 
  - Circular crop
  - Positioned at top of card
  - Shows patient photo (Jessica Taylor)

- **Patient Name**: 
  - Large, bold, dark gray sans-serif font
  - "Jessica Taylor" or "Jessica Tayl"

- **Patient Details Section**:
  - Each detail has: Icon + Label + Value
  - **Date Of Birth**: 
    - Icon: Calendar icon
    - Label: "Date Of Birth" (dark gray, regular weight)
    - Value: "August 23, 1996" (darker gray, slightly bolder)
  
  - **Gender**: 
    - Icon: Female symbol (Venus symbol)
    - Label: "Gender" (dark gray, regular weight)
    - Value: "Female" (darker gray, slightly bolder)
  
  - **Contact Info**: 
    - Icon: Phone icon
    - Label: "Contact Info." (dark gray, regular weight)
    - Value: "(415) 555-1234" (darker gray, slightly bolder)
  
  - **Emergency Contacts**: 
    - Icon: Phone icon
    - Label: "Emergency Contacts" (dark gray, regular weight)
    - Value: "(415) 555-5678" (darker gray, slightly bolder)
  
  - **Insurance Provider**: 
    - Icon: Shield with checkmark icon
    - Label: "Insurance Provider" (dark gray, regular weight)
    - Value: "Sunrise Health Assurance" (darker gray, slightly bolder, may truncate)

- **Action Button**:
  - Background: Vibrant teal/cyan (#00BFA5 or similar)
  - Text: "Show All Information" (white, bold, sans-serif)
  - Border Radius: Rounded corners
  - Position: Bottom of patient card

#### Vital Signs History Section
- **Title**: "History" (likely "Diagnosis History" or "Vitals History")
  - Large, bold heading
  - Dark gray

- **Time Range Selector**:
  - Dropdown on the right side
  - Shows "Last 6 months" with downward chevron
  - Allows time range selection for chart

- **Chart**:
  - **Background**: Light purple/pink tinted background
  - **Grid Lines**: Faint horizontal grid lines
  - **Chart Type**: Line chart
  - **Data Lines**:
    - **Line 1**: Pink/magenta color with larger circular data points
      - Shows fluctuating trend
      - Peaks around December 2023 and March 2024
      - Dips in January 2024
    - **Line 2**: Purple color with smaller circular data points
      - Similar trend pattern but at lower values
      - Also peaks around December 2023 and March 2024
      - Dips in January 2024
  - **X-Axis Labels**: 
    - "Nov, 2023"
    - "Dec, 2023"
    - "Jan, 2024"
    - "Feb, 2024"
    - "Mar, 2024" (may be truncated)

#### Data Cards (Below Chart)
- **Card 1 (Left)**: 
  - Background: Light blue/cyan
  - Visible text: "Rate" and "n"
  - Likely shows "Heart Rate" metric

- **Card 2 (Right)**: 
  - Background: Light pink
  - **Icon**: White circular icon with red-bulb thermometer
    - Black outline
    - Three black scale lines
  - **Label**: "Temperature"
  - **Value**: "98.6°F" (large, bold font)

#### Lab Results Section
- **Heading**: "Lab Results"
  - Large, bold, dark gray sans-serif font
  - Positioned below patient information card

## Color Palette

### Primary Colors
- **Background**: White (#FFFFFF)
- **Text Primary**: Dark gray (#333333 or similar)
- **Text Secondary**: Lighter gray for labels
- **Text Values**: Darker gray, slightly bolder

### Accent Colors
- **Teal/Cyan Button**: Vibrant teal/cyan (#00BFA5 or similar)
- **Light Purple**: Used for sidebar cards and chart background
- **Light Pink**: Used for sidebar cards and data cards
- **Light Blue/Cyan**: Used for data cards
- **Pink/Magenta**: Chart line color (larger data points)
- **Purple**: Chart line color (smaller data points)
- **Light Blue Border**: Active state for right-side icons

### Chart Colors
- **Line 1**: Pink/Magenta (#E91E63 or similar)
- **Line 2**: Purple (#9C27B0 or similar)
- **Chart Background**: Light purple/pink tint

## Typography

### Font Family
- Sans-serif font throughout
- Modern, clean appearance

### Font Sizes & Weights
- **Headings**: Large, bold
- **Labels**: Regular weight, dark gray
- **Values**: Slightly bolder, darker gray
- **Button Text**: Bold, white

## Component Specifications

### Cards
- **Background**: White
- **Border Radius**: Rounded corners
- **Shadow**: Likely subtle shadow for depth
- **Padding**: Generous padding around content

### Buttons
- **Primary Button**: 
  - Background: Teal/cyan
  - Text: White, bold
  - Border Radius: Rounded corners
  - Padding: Comfortable padding

### Icons
- **Profile Icons**: Calendar, phone, female symbol, shield with checkmark
- **Data Icons**: Thermometer with red bulb
- **Navigation Icons**: Grid, code brackets, curly braces

### Chart
- **Type**: Line chart
- **Data Points**: Circular markers
  - Larger points for primary line (pink)
  - Smaller points for secondary line (purple)
- **Grid**: Faint horizontal lines
- **Background**: Light tinted background

## Spacing & Layout

### General
- Clean, modern layout
- Generous white space
- Card-based design system
- Responsive considerations (based on layout structure)

### Specific Measurements (Estimated from visual inspection)
- Card padding: ~24-32px
- Section spacing: ~32px between major sections
- Icon size: ~20-24px
- Profile picture: ~80-100px diameter

## Interactive Elements

### Dropdown
- Time range selector ("Last 6 months")
- Downward chevron indicator
- Positioned on right side of chart section

### Buttons
- "Show All Information" - primary action button
- Right-side floating icons (code brackets, curly braces)

### Navigation
- Breadcrumb navigation
- Grid icon (likely hamburger/menu)

## Additional Notes

- Design appears to be for a healthcare/medical dashboard
- Focus on patient information and vital signs tracking
- Clean, professional aesthetic
- Good use of color coding for different data types
- Icons used consistently throughout for visual clarity

