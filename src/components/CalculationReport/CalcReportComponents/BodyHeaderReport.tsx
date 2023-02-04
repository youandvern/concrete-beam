import { BodyHeading } from "../CalculationRunTypes";
import { addReference, CalcTypography } from "./reportUtilities";

interface Props {
  item: BodyHeading;
  fontSize: string;
  headerNumber?: string;
}
export default function BodyHeaderReport({ item, fontSize, headerNumber }: Props) {
  return addReference(
    <CalcTypography variant="h4" marginTop="1.5rem" marginBottom="0.5rem" fontSize={fontSize}>
      {headerNumber != null ? headerNumber + "\u00A0" : ""} {item.value}
    </CalcTypography>,
    item.reference
  );
}
