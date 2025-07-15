import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "../ui/table";
import { MenuItem } from "@prisma/client"

interface MenuItemsProps {
    menuItems: MenuItem[]
}
export default function Menutable({ menuItems }: MenuItemsProps) {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[100px]">Dish</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead className="text-right">Price</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {
                    menuItems && menuItems.map((item) => (
                        <TableRow>
                            <TableCell className="font-medium">{item.dish}</TableCell>
                            <TableCell>{item.description}</TableCell>
                            <TableCell>{item.price}</TableCell>
                        </TableRow>
                    ))
                }
            </TableBody>
        </Table>
    )
}