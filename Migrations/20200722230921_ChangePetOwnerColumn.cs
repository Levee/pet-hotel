using Microsoft.EntityFrameworkCore.Migrations;

namespace dotnet_bakery.Migrations
{
    public partial class ChangePetOwnerColumn : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_pets_petOwners_ownedByid",
                table: "pets");

            migrationBuilder.DropIndex(
                name: "IX_pets_ownedByid",
                table: "pets");

            migrationBuilder.DropColumn(
                name: "ownedByid",
                table: "pets");

            migrationBuilder.AddColumn<int>(
                name: "petOwnerid",
                table: "pets",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_pets_petOwnerid",
                table: "pets",
                column: "petOwnerid");

            migrationBuilder.AddForeignKey(
                name: "FK_pets_petOwners_petOwnerid",
                table: "pets",
                column: "petOwnerid",
                principalTable: "petOwners",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_pets_petOwners_petOwnerid",
                table: "pets");

            migrationBuilder.DropIndex(
                name: "IX_pets_petOwnerid",
                table: "pets");

            migrationBuilder.DropColumn(
                name: "petOwnerid",
                table: "pets");

            migrationBuilder.AddColumn<int>(
                name: "ownedByid",
                table: "pets",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_pets_ownedByid",
                table: "pets",
                column: "ownedByid");

            migrationBuilder.AddForeignKey(
                name: "FK_pets_petOwners_ownedByid",
                table: "pets",
                column: "ownedByid",
                principalTable: "petOwners",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
