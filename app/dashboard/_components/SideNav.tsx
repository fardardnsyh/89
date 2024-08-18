import React, { useEffect } from "react";
import { ChartArea, LibraryBig, MessageSquare, Shield } from "lucide-react";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

function SideNav() {
  const path = usePathname();
  const menuList = [
    {
      id: 1,
      name: "My Forms",
      icon: LibraryBig,
      path: "/dashboard",
    },
    {
      id: 2,
      name: "Responses",
      icon: MessageSquare,
      path: "/dashboard/responses",
    },
    {
      id: 3,
      name: "Analylics",
      icon: ChartArea,
      path: "/dashboard/analytics",
    },
    {
      id: 4,
      name: "Upgrades",
      icon: Shield,
      path: "/dashboard/upgrade",
    },
  ];
  useEffect(() => {}, [path]);

  return (
    <div className="h-screen shadow-md border">
      <div className="p-4">
        {menuList.map((menu, index) => (
          <h2
            key={index}
            className={`flex items-center gap-3 p-4 mb-3 hover:bg-primary hover:text-white rounded-lg cursor-pointer ${
              path === menu.path && "bg-primary text-white"
            }`}
          >
            <menu.icon />
            {menu.name}
          </h2>
        ))}
      </div>
      <div className="fixed bottom-7 p-6 w-64">
        <Button className="w-full">+ Create Form</Button>
        <div className="py-7">
          <Progress value={33} />
          <h2 className="text-sm mt-2 text-gray-600">
            <strong> 2</strong> out of <strong>3</strong> Form Created
          </h2>
          <h2 className="text-sm mt-3 text-gray-600">Upgrade Your Plan for Unlimited AI Form</h2>
        </div>
      </div>
    </div>
  );
}

export default SideNav;
